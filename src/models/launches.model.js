const axios = require('axios');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100, //flight_number
    mission: 'Kepler Exploration X',  //name
    rocket: 'Explorer Is1',  //rocket.name
    launchDate: new Date('December 27, 2030'),  //date_local
    target: 'Kepler-442 b',  //na
    customers: ['NASA', 'ISRO'],  //payload.customers for each payload
    upcoming: true,  //upcoming
    success: true,   //success
};

launches.set(launch.flightNumber, launch);
//launches.get(100);

async function getAllLaunches(skip, limit) {
    //return Array.from(launches.values());
    return await launchesDatabase
        .find({}, { '_id': 0, '__v': 0 })
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
}

async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    }); 
}
//saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
    console.log('Downloading data');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],  //upcoming
            success: launchDoc['success'],   //success
            customers,  //payload.customers for each payload
        };
        console.log(`${launch.flightNumber} ${launch.mission}`);
        //TODO: populae launches
        await saveLaunch(launch);
    }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });
    if (firstLaunch) {
        console.log('Launch Data was already loaded');
    } else {
        await populateLaunches();
    }
    
};



async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        kepler_name: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
            customers: ['nasa', 'isro'],
            upcoming: true,
            success: true,
            flightNumber: newFlightNumber,
    })
    console.log("Adding:" + newLaunch);
    await saveLaunch(newLaunch);
}

//function addnewlaunch(launch) {
//    latestflightnumber++;
//    launches.set(
//        latestflightnumber,
//        object.assign(launch, {
//            customers: ['nasa', 'isro'],
//            upcoming: true,
//            success: true,
//            flightnumber: latestflightnumber,
//        })
//    );
//}
async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    //return launches.has(launchId);
    //return await launchesDatabase.findOne({
    //    flightNumber: launchId,
    /*});*/
    return await findLaunch({ fightNumber: launchId,})
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    console.log("flight no:" + latestLaunch.flightNumber);
    return latestLaunch.flightNumber;
}

async function abortLaunchById(launchId) {
    //const aborted = launches.get(launchId);
    //aborted.upcoming = false;
    //aborted.success = false;
    //return aborted;

    const aborted = await launchesDatabase.updateOne({ flightNumber: launchId, },
        {
            upcoming: false,
            success: false,
        });
    await console.log("Mission abort:" + await aborted);
    return aborted.acknowledged === true && aborted.matchedCount === 1;
}

module.exports = {
    getAllLaunches,
    loadLaunchData,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch,
}
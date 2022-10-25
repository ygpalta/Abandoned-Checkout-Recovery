const { getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    const { skip, limit } = getPagination(req.query);
    console.log(req.query);
    console.log("skip: " + skip + limit);
    return res.status(200).json(await getAllLaunches(skip, limit));
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required Launch property",
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid Date',
        })
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);


    // If launch do no exist
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(404).json({
            error: 'Launch not aborted',
        });

        
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};
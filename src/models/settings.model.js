const Settings = require("./settings.mongoose");

async function getSettings(setting) {
    return await Settings.findOne({ name:setting}, {
        '_id': 0, '__v':0,
    });
}

async function updateIntervals(settings){
    const updatedIntervals = await Settings.findOneAndUpdate({ name: "intervals", },
        {
            interval1: settings.interval1,
            interval2: settings.interval2,
            interval3: settings.interval3
        });
    return updatedIntervals;
    // console.log("Updating");
    // console.log(settings);
    // console.log("Updated");
    // return settings;
}

module.exports = {
    getSettings, updateIntervals
}
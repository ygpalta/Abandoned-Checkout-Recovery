const { getSettings, updateIntervals } = require("../../models/settings.model");

async function httpGetSettings(req, res){
    return res.status(200).json(await getSettings("intervals"));
}

async function httpUpdateIntervals(req, res){
    return res.status(200).json(await updateIntervals(req.body));
}

module.exports = {
    httpGetSettings, httpUpdateIntervals
};
const { getSettings, updateIntervals } = require("../../models/settings.model");
const {getList, getAbandoned} = require("../../models/carts.model");
async function httpGetSettings(req, res){
    return res.status(200).json(await getSettings("intervals"));
}

async function httpUpdateIntervals(req, res){
    return res.status(200).json(await updateIntervals(req.body));
}

async function httpGetSchedule(req, res){
    return res.status(200).json(await getList());
}

async function httpGetAbandoned(req,res){
    return res.status(200).json(await getAbandoned());
}

module.exports = {
    httpGetSettings, httpUpdateIntervals, httpGetSchedule, httpGetAbandoned
};
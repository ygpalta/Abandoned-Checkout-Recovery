const { getAllItems } = require('../../models/items.model');

async function httpGetAllItems(req, res) {
    //return res.status(200).json({});
    return res.status(200).json(await getAllItems());
}

module.exports = {
    httpGetAllItems
};
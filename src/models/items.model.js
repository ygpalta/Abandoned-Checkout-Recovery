const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const items = require('./items.mongo');



async function getAllItems() {
    //return await items.find({});
    return await items.find({}, {
        '_id': 0, '__v':0,
    });
}

// async function savePlanet(planet) {
//     try {
//         await items.updateOne({
//             kepler_name: planet.kepler_name,
//         }, {
//             kepler_name: planet.kepler_name,
//         }, {
//             upsert: true,
//         });
//     } catch (err) {
//         console.error(`Could not save a Planet ${err}`)
//     }
// }

module.exports = {
    getAllItems,
}
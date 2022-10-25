const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;


mongoose.connection.once('open', () => {
    console.log('Mongo DB Connection Ready');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});


async function mongoConnect() {
    console.log("COnnecting");
    await mongoose.connect(MONGO_URL);
    console.log("Connected");
};

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
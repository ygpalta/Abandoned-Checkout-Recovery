const PORT = process.env.PORT || 8000;
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { startBree } = require('./services/appcron');
const {main} = require('../jobs/sendEmail');
const server = http.createServer(app);



async function startServer() {
   
    // await main();
    // console.log("without await");
    // main();
    await mongoConnect();
    startBree();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
};

startServer();


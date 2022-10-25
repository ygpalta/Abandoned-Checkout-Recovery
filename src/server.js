const PORT = process.env.PORT || 8000;
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { loadPlanetData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');
const { loadLaunchData } = require('./models/launches.model');
const server = http.createServer(app);



async function startServer() {
    await mongoConnect();
    await loadPlanetData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
};

startServer();


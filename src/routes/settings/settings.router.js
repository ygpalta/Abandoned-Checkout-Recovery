const express = require('express');
const { httpGetSettings, httpUpdateIntervals,httpGetSchedule,httpGetAbandoned } = require('./settings.controller')
const settingsRouter = express.Router();

settingsRouter.get('/', httpGetSettings);
settingsRouter.post('/', httpUpdateIntervals);
settingsRouter.get('/schedule', httpGetSchedule);
settingsRouter.get('/getAbandoned', httpGetAbandoned);

module.exports = settingsRouter;
const express = require('express');
const { httpGetSettings, httpUpdateIntervals } = require('./settings.controller')
const settingsRouter = express.Router();

settingsRouter.get('/', httpGetSettings);
settingsRouter.post('/', httpUpdateIntervals);

module.exports = settingsRouter;
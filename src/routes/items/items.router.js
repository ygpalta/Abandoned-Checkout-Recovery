const express = require('express');
const { httpGetAllItems } = require('./items.controller')
const itemsRouter = express.Router();

itemsRouter.get('/', httpGetAllItems);

module.exports = itemsRouter;
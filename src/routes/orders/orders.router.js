const express = require('express');
const { httpOrderById, httpSaveOrder } = require('./orders.controller')
const ordersRouter = express.Router();

ordersRouter.get('/:id', httpOrderById);
ordersRouter.post('/', httpSaveOrder);

module.exports = ordersRouter;
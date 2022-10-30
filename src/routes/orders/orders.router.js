const express = require('express');
const { httpOrderById, httpSaveOrder, httpGetRecoveredOrders } = require('./orders.controller')
const ordersRouter = express.Router();

ordersRouter.get('/getOrder/:id', httpOrderById);
ordersRouter.post('/', httpSaveOrder);
ordersRouter.get('/recovered', httpGetRecoveredOrders);

module.exports = ordersRouter;
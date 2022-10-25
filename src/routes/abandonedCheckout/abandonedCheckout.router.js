const express = require('express');
const { httpSetAbandoned } = require('./abandonedCheckout.controller')
const abandonedCheckoutRouter = express.Router();

abandonedCheckoutRouter.post('/', httpSetAbandoned);

module.exports = abandonedCheckoutRouter;
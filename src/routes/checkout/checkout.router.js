const express = require('express');
const { httpGetCartById, httpSaveCart } = require('./checkout.controller')
const checkoutRouter = express.Router();

checkoutRouter.get('/:checkout_id', httpGetCartById);
checkoutRouter.post('/', httpSaveCart);

module.exports = checkoutRouter;
const { req } = require('express');
const { setIsAbandonedFalse,checkIsAbandoned } = require('../../models/carts.model');
const {  getOrderById, saveOrder,getRecoveredOrders } = require('../../models/orders.model');

async function httpOrderById(req, res) {
    //return res.status(200).json({});
    return res.status(200).json(await getOrderById(req.params.id));
}

async function httpSaveOrder(req, res) {
    const order = req.body;
    await saveOrder(order);
    await setIsAbandonedFalse(order.checkout_id);
    return res.status(201).json(order);
}

async function httpGetRecoveredOrders(req,res) {
    return res.status(200).json(await getRecoveredOrders());
}

module.exports = {
    httpOrderById,
    httpSaveOrder,
    httpGetRecoveredOrders
};
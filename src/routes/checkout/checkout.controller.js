const { req } = require('express');
const {  getCartById, saveCart } = require('../../models/carts.model');

async function httpGetCartById(req, res) {
    //return res.status(200).json({});
    return res.status(200).json(await getCartById(req.params.checkout_id));
}

async function httpSaveCart(req, res) {
    const cart = req.body;
    console.log(cart);
    await saveCart(cart);
    return res.status(201).json(cart);
}

module.exports = {
    httpGetCartById,
    httpSaveCart
};
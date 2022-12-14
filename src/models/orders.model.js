const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const orders = require('./orders.mongo');



async function getOrderById(id) {
    return await orders.find({ id:id,}, {
        '_id': 0, '__v':0,
    });
}

async function getRecoveredOrders(){
    console.log("getting recovered");
    
    const recovered = await orders.find({wasAbandoned: true});
    console.log(recovered);
    return recovered;
}

async function saveOrder(order) {
    return await orders.findOneAndUpdate({
        id: order.id,
    }, order, {
        upsert: true,
    }); 
}





module.exports = {
    getOrderById,
    saveOrder,
    getRecoveredOrders
}
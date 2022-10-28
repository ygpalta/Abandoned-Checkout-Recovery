const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const carts = require('./carts.mongo');
const { getSettings } = require('./settings.model');


async function getCartById(id) {
    //return await items.find({});
    return await carts.find({ checkout_id:id,}, {
        '_id': 0, '__v':0,
    });
}

async function checkIsAbandoned(id) {
    const abandoned = carts.findOne({
        checkout_id: id
    });

    return await abandoned.isAbandoned==true;

}
async function getList(){
    const currDate = new Date(Date.now());
    currDate.setSeconds(0,0);
    console.log("getting list:");
    const list = await carts.find().
                        and([
                            {isAbandoned: true}, 
                            {   $or: [
                                { mail1: currDate }, { mail2: currDate }, { mail3: currDate }
                            ]    } 
                        ]);
    console.log("scheduled for:");
    console.log(list);
    return list
}

async function getAbandoned(){
    const abandoned = await carts.find({
        isAbandoned: true,
    });
    return abandoned
}

async function saveCart(cart){
    return await carts.findOneAndUpdate({
        checkout_id: cart.checkout_id,
    }, cart, {
        upsert: true,
    }); 
};


async function setIsAbandonedTrue(id) {
    const intervals =await getSettings("intervals");
    var curr = new Date().setSeconds(0,0);
    let m1 = new Date(curr + intervals.interval1);
    let m2 = new Date(curr + intervals.interval2);
    let m3 = new Date(curr + intervals.interval3);
    const abandoned = await carts.updateOne({ checkout_id: id, },
        {
            isAbandoned: true,
            mail1: m1,
            mail2: m2,
            mail3: m3,
        });
    await console.log("Checkout Abandoned :" + await abandoned);
    return abandoned.isAbandoned === true ;
}

async function setIsAbandonedFalse(id) {
    const abandoned = carts.findOne({
                        checkout_id: id
                    });

    if (abandoned) {
        await carts.updateOne({ checkout_id: id, },
            {
                isAbandoned: false,
            });
        console.log('Checkout Recovered');
    } else {
        console.log('Checkout Do not exist');
    }

    return abandoned.isAbandoned;
}

module.exports = {
    getCartById,
    saveCart,
    setIsAbandonedTrue,
    setIsAbandonedFalse,
    checkIsAbandoned ,
    getList,
    getAbandoned
}
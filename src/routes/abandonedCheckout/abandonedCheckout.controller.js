const { req } = require('express');
const { setIsAbandonedTrue } = require('../../models/carts.model');

async function httpSetAbandoned(req, res) {
    //return res.status(200).json({});
    await setIsAbandonedTrue(req.body.checkout_id);
    // await setScheduler();
    setScheduler(req.body);
    return res.status(200).json({});

    // return res.status(200).json(await getCartById(req.body.checkout_id));
}

function setScheduler(reqBody){
    console.log("email scheduled");  
    return 1;  
}


module.exports = {
    httpSetAbandoned
};
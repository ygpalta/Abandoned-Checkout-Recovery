require("dotenv").config()
const { workerData } = require("worker_threads");
const { checkIsAbandoned,getList } = require('../src/models/carts.model.js');
const nodeMailer = require("nodemailer");
// const { list } = require("pm2");

async function main() {
    console.log("y");
    // console.log(workerData.description);

    //Transporter configuration
    let transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure:false,
        auth: {
            user: 'yessenia.pouros14@ethereal.email',
            pass: 'Z7UFEs2WXDKGaQFRKC'
        }
    });
    console.log("transportercreated");

    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    await transporter.sendMail({
        from: "estore.checkouts@outlook.com", //SENDER
        to: "ygpalta@gmail.com",//MULTIPLE RECEIVERS
        subject: "Did You Forget This?", //EMAIL SUBJECT
        text: "Hi message", //EMAIL BODY IN TEXT FORMAT
    })


    // const list = await getList();
    // console.log("Abad:", list);
    // list.forEach(async (checkout) => {

    //     const recipient = checkout.contact_email;
    //     const message = `Hi ${checkout.customer.name}, you were trying to place an order with us but failed to do so. Don't worry, You can complete your transaction by clicking on below link: \n ${process.env.URL}/checkout/${checkout.checkout_id} .`
    
    //     //Email configuration
    //     await transporter.sendMail({
    //         from: process.env.EMAIL, //SENDER
    //         to: recipient, //MULTIPLE RECEIVERS
    //         subject: "Did You Forget This?", //EMAIL SUBJECT
    //         text: message, //EMAIL BODY IN TEXT FORMAT
    //     })
    // });

}

main().catch(err => console.log(err));

module.exports = {
    main
};
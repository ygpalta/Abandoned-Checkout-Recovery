require("dotenv").config()
const { workerData } = require("worker_threads");
const { checkIsAbandoned,getList } = require('../src/models/carts.model.js');
const nodeMailer = require("nodemailer");

async function main() {
    console.log("Entering in Main Function");
    // console.log(workerData.description);

    //Transporter configuration
    let transporter = nodeMailer.createTransport({
        pool:true,
        host: "smtp.office365.com",
        port: 25,
        secure:false,
        auth: {
            user: 'estore.checkouts@outlook.com',
            pass: 'Checkout@Recovery',
        },
        
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
        to: "ivmal98@gmail.com",//MULTIPLE RECEIVERS
        subject: "Did You Forget This?", //EMAIL SUBJECT
        text: "Hi message", //EMAIL BODY IN TEXT FORMAT
    })

}

main().catch(err => console.log(err));

module.exports = {
    main
};
require("dotenv").config()
const { getList } = require('../src/models/carts.model.js');
const nodeMailer = require("nodemailer");
const { Error } = require("mongoose");

async function main() {
 
//     Transporter configuration
    let transporter = nodeMailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure:false,
        auth: {
            user: 'checkoutrecoveryplugin@outlook.com',
            pass: 'Checkout@Recovery',
        },
        
    });
 

    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          throw new Error("server not setup successfully")
        } else {
          console.log("Server sertup successfuly");
        }
      });

          const list = await getList();
    console.log("AbandonedList:", list);
    list.forEach(async (checkout) => {
        
        const recipient = checkout.contact_email;
        const message = `Hi ${checkout.customer.name}, you were trying to place an order with us but failed to do so. Don't worry, You can complete your transaction by clicking on below link: \n ${process.env.URL}/checkout/${checkout.checkout_id} .`
        console.log("Sending Email reminder to ", checkout.customer.name);
        //Email configuration
        await transporter.sendMail({
            from: "smtpserver1.2@outlook.com", //SENDER
            to: recipient, //MULTIPLE RECEIVERS
            subject: "Did You Forget This?", //EMAIL SUBJECT
            text: message, //EMAIL BODY IN TEXT FORMAT
        })
    });

}



main().catch(err => console.log(err));

module.exports = {
    main
};

const PORT = process.env.PORT || 8000;
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { startBree } = require('./services/appcron');
const {main} = require('../jobs/sendEmail');
const server = http.createServer(app);
const { getList } = require('./models/carts.model.js');
const nodeMailer = require("nodemailer");
const { Error } = require("mongoose");

const schedule = require('node-schedule');

const job = schedule.scheduleJob('* * * * *', async function(){
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

    console.log("running job:")
    const list = await getList();
    console.log(list);

    list.forEach(async (checkout) => {

        const recipient = checkout.customer.email;
        const message = `Hi ${checkout.customer.first_name}, you were trying to place an order with us but failed to do so. Don't worry, You can complete your transaction by clicking on below link: \n ${process.env.URL}/checkout/${checkout.checkout_id} .`;
        console.log("Sending Email reminder to ", checkout.customer.first_name, " on ", checkout.customer.email);
        // Email configuration
        await transporter.sendMail({
            from: "checkoutrecoveryplugin@outlook.com", //SENDER
            to: recipient, //MULTIPLE RECEIVERS
            subject: "Did You Forget This?", //EMAIL SUBJECT
            text: message, //EMAIL BODY IN TEXT FORMAT
        })
    });
});



async function startServer() {
   
    await mongoConnect();
    // startBree();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
};

startServer();


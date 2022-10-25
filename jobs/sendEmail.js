require("dotenv").config()
const { workerData } = require("worker_threads");
const { checkIsAbandoned,getList } = require('../src/models/carts.model.js');
const nodeMailer = require("nodemailer");
// const { list } = require("pm2");

async function main() {
    console.log("y");
    console.log(workerData.description);

    //Transporter configuration
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL, //REPLACE WITH YOUR EMAIL ADDRESS
            pass: process.env.PASSWORD //REPLACE WITH YOUR EMAIL PASSWORD
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL, //SENDER
        to: "ygpalta@gmail.com", //MULTIPLE RECEIVERS
        subject: "Did You Forget This?", //EMAIL SUBJECT
        text: "Hi message", //EMAIL BODY IN TEXT FORMAT
    })

    const list = await getList();
    console.log("Abad:", list);
    list.forEach(async (checkout) => {

        const recipient = checkout.contact_email;
        const message = `Hi ${checkout.customer.name}, you were trying to place an order with us but failed to do so. Don't worry, You can complete your transaction by clicking on below link: \n ${process.env.URL}/checkout/${checkout.checkout_id} .`
    
        //Email configuration
        await transporter.sendMail({
            from: process.env.EMAIL, //SENDER
            to: recipient, //MULTIPLE RECEIVERS
            subject: "Did You Forget This?", //EMAIL SUBJECT
            text: message, //EMAIL BODY IN TEXT FORMAT
        })
    });

}

main().catch(err => console.log(err));
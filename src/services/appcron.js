const Bree = require('bree')

const bree = new Bree({
  jobs : [{
    name : 'sendEmail2',
    cron : '* * * * *',
    worker : {
      workerData : {
        description : "This job will send emails."
      }
    }
  }]
})

function startBree() {
    console.log("Starting Bree");
    bree.start();    
}

module.exports= {
    startBree,
}
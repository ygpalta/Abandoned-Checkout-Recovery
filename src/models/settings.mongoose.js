const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
    {
        "name": {
          "type": "String"
        },
        "interval1": {
          "type": "Number"
        },
        "interval2": {
          "type": "Number"
        },
        "interval3": {
          "type": "Number"
        }
      }
  );

module.exports = mongoose.model('Settings', settingsSchema);

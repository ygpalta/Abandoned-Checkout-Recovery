const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    "id": {
      "type": "Number"
    },
    "name": {
      "type": "String"
    },
    "price": {
      "type": "String"
    }
  });

module.exports = mongoose.model('Item', itemsSchema);

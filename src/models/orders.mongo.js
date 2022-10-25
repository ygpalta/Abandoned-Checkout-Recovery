const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
  {
    "id": {
      "type": "Number"
    },
    "checkout_id": {
      "type": "Number"
    },
    "customer_id": {
      "type": "Number"
    },
    "placed": {
      "type": "Mixed"
    },
    "payment_id": {
      "type": "Number"
    }
  }
  );

module.exports = mongoose.model('Orders', ordersSchema);

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
    },
    "wasAbandoned": {
      "type": "Boolean"
    },
    "customer_name": {
      "type": "Mixed"
    },
    "email": {
      "type": "Mixed"
    },
  }
  );

module.exports = mongoose.model('Orders', ordersSchema);

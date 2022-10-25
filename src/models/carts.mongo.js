const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
    "checkout_id": {
      "type": "Number"
    },
    "closed_at": {
      "type": "Mixed"
    },
    "isAbandoned": {
      "type": "Mixed"
    },
    "contact_email": {
      "type": "String"
    },
    "created_at": {
      "type": "Date"
    },"mail1": {
      "type": "Date"
    },"mail2": {
      "type": "Date"
    },"mail3": {
      "type": "Date"
    },
    "current_total_price": {
      "type": "String"
    },
    "landing_site": {
      "type": "String"
    },
    "customer": {
      "id": {
        "type": "Number"
      },
      "email": {
        "type": "String"
      },
      "first_name": {
        "type": "String"
      },
      "last_name": {
        "type": "String"
      },
      "phone": {
        "type": "String"
      },
      "address": {
        "type": "Date"
      },
      "city": {
        "type": "String"
      },
      "province": {
        "type": "String"
      },
      "country": {
        "type": "String"
      },
      "zip": {
        "type": "Date"
      }
    },
    "line_items": [{
      "id": {
        "type": "Number"
      },
      "name": {
        "type": "String"
      },
      "price": {
        "type": "String"
      }
    }
    ]
  }
  );

module.exports = mongoose.model('Carts', cartsSchema);

# Abandoned Checkout Recovery (Backend)

This project is made using MongoDB, Express.js, React.js and Node (MERN Stack). 

[Abandoned Checkout Recovery- Github Repo](https://github.com/ygpalta/abandoned-checkout-recovery)

[Admin Panel FrontEnd - Github Repo](https://github.com/ygpalta/Abandoned-Checkout-Recovery/)

[Live Project Link - https://abandoned-checkout-frontend.herokuapp.com/ (Demo Cart Page)](https://abandoned-checkout-frontend.herokuapp.com)

[Admin Panel - https://abandoned-checkout-frontend.herokuapp.com/admin](https://abandoned-checkout-frontend.herokuapp.com/admin)

[API/Webhook Live End point - https://abandoned-checkout-recovery.herokuapp.com/](https://abandoned-checkout-recovery.herokuapp.com/)

## API End Points

The project contains 2 demo pages for order, checkout and a Admin Panel to configure schedule and view emails sent.

### Items

`GET` `/items` -  Return items present in Cart

### Checkout

`POST` `/checkout`- Save Cart and returns {checkout_id}

`GET` `/checkout/:checkout_id` - Return details for given checkout_id

### Abandoned Checkout

`POST` `/abandonedCheckout`  -  Set the given checkout_id as Abandoned and set mail schedule.

### Orders

`POST` `/orders`  -  Set given checkout_id as not abandoned and save the order.

`GET` `/orders/:id` -  Return rder details of given order id

### Setting

`GET` `/settings`  -  Return current email schedule

`POST` `/settings`  -  Update the intervals for email schedule.

`GET` `/settings/getAbandoned`  -  Return list of all Abandoned checkouts.

`GET` `/settings/schedule`  -  Return list of emails to be sent just now for email shceduler job. 

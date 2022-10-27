const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const itemsRouter = require('./routes/items/items.router');
const checkoutRouter = require('./routes/checkout/checkout.router');
const abandonedCheckoutRouter = require('./routes/abandonedCheckout/abandonedCheckout.router');
const ordersRouter = require('./routes/orders/orders.router');
const settingsRouter = require('./routes/settings/settings.router');
const app = express();

app.use(cors());

app.use(morgan('c'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use('/items', itemsRouter);
app.use('/checkout', checkoutRouter);
app.use('/abandonedCheckout',abandonedCheckoutRouter);
app.use('/orders', ordersRouter);
app.use('/settings', settingsRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app;
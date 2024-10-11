const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // or 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,     // Fixed here
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;

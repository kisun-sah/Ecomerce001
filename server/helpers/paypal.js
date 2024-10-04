const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AWy1HeSlU_gzWnhOFdBPnY_dofAMGSCQvSBtW4PVE-a5g_cdPky5JlZa4UszGRBaC8OSqNfB7hOZi37R",
  client_secret: "EJ3RXWSrXtx9Ysn4akd6iakWpiGsZ9aTxr-UY3eoq44KcmDzDXEE1HHsxD0736MbgDh2r5070Id7SvVG",
});

module.exports = paypal;
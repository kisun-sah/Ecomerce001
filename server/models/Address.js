const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    phone: String,
    fullName:String,
    address: String,
    pincode: String,
    city: String,
    state: String,
    country: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
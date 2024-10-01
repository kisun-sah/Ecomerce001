const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: "India" }, // assuming a default country
    pincode: { type: String, required: true },
    landmark: { type: String },
    addressType: { type: String, enum: ["Home", "Work"], required: true },
    defaultAddress: { type: Boolean, default: false }, // to mark default address
    notes: { type: String }, // additional delivery notes
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);

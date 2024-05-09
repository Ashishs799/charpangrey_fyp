const mongoose = require("mongoose");

const Seller = mongoose.Schema({
  seller: {
    type: String,
    ref: "Users",
    required: true,
  },
  email: {
    type: String,
    ref: "Users",
    required: true,
    unique: true,
  },
  carName: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  offerType: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  door: {
    type: String,
  },
  cylinder: {
    type: String,
  },
  color: {
    type: String,
  },
  drive_Type: {
    type: String,
  },
  seats: {
    type: String,
  },
  engine_Size: {
    type: String,
  },
  approved: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Seller", Seller);

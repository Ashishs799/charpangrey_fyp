const mongoose = require("mongoose");
const Product = require("../models/car");

const Users = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", Users);

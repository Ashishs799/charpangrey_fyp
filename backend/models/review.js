// models/comment.js

const mongoose = require("mongoose");

const reviewScheme = new mongoose.Schema({
  reviewer: {
    type: String,
    ref: "Users",
    required: true,
  },
  car: {
    type: String,
    ref: "Car",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewScheme);

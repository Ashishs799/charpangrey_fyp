const mongoose = require("mongoose");

const Booking = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    pickupHour: {
      type: String,
      required: true,
    },
    pickupMin: {
      type: String,
      required: true,
    },
    pickupPeriod: {
      type: String,
      required: true,
    },
    carId: {
      type: String, 
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  });

  module.exports = mongoose.model("Booking", Booking);
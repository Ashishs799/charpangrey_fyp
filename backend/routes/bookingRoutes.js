const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route for booking a car
router.post("/bookcar/:id", bookingController.bookCar);

// Route for fetching booked car information by car ID
router.get("/bookcar/:carId", bookingController.fetchedBookedCarById);

// Route for getting all bookings
router.get("/bookcar", bookingController.allBooking);

module.exports = router;

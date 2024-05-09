const Booking = require("../models/booking");
const Product = require("../models/car");
// function for booking car
exports.bookCar = async (req, res) => {
  try {
    const carId = req.params.id;
    console.log("Requested ID for Booking:", carId);

    const car_info = await Product.findOne({ id: carId });
    console.log("Retrieved car info for Booking:", car_info);

    if (!car_info) {
      return res.status(404).send({ message: "Car not found for Booking" });
    }

    const { carName, image } = car_info;

    const {
      name,
      email,
      phone,
      destination,
      bookingDate,
      pickupHour,
      pickupMin,
      pickupPeriod,
      status,
    } = req.body;

    const booking = new Booking({
      name,
      email,
      phone,
      destination,
      bookingDate,
      pickupHour,
      pickupMin,
      pickupPeriod,
      carId,
      carName,
      image,
      status,
    });

    await booking.save();
    console.log("Booking Saved !!");

    res.json({
      success: true,
      message: "Booking successful",
    });
  } catch (error) {
    console.error("Error booking car:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// function for fetching booked car information by car ID
exports.fetchedBookedCarById = async (req, res) => {
  try {
    const carId = req.params.carId;
    console.log("Requested ID for fetching booking:", carId);

    const booking = await Booking.findOne({ carId: carId });
    console.log("Retrieved booking info by Id:", booking);

    if (!booking || booking.length === 0) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// function for getting all bookings
exports.allBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    console.log("Retrieved booking info for all bookings:", booking);

    if (!booking || booking.length === 0) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

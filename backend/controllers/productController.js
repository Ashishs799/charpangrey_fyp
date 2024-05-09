const Product = require("../models/car");
const Users = require("../models/users");
// Function to add a new car
exports.addCar = async (req, res) => {
  try {
    // Retrieve all existing cars
    let cars = await Product.find({});

    // Determine the ID for the new car
    let id;
    if (cars.length > 0) {
      let lastCar = cars[cars.length - 1];
      id = lastCar.id + 1;
    } else {
      id = 1;
    }

    // Create a new car object based on the request body
    const car = new Product({
      id: id,
      carName: req.body.carName,
      image: req.body.image,
      year: req.body.year,
      offerType: req.body.offerType,
      discountedPrice: req.body.discountedPrice,
      oldPrice: req.body.oldPrice,
      type: req.body.type,
      condition: req.body.condition,
      mileage: req.body.mileage,
      model: req.body.model,
      description: req.body.description,
      make: req.body.make,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      token_no: req.body.token_no,
      door: req.body.door,
      cylinder: req.body.cylinder,
      color: req.body.color,
      drive_Type: req.body.drive_Type,
      seats: req.body.seats,
      engine_Size: req.body.engine_Size,
    });

    // Save the new car to the database
    await car.save();
    console.log("SAVED !!");

    // Send a success response
    res.json({
      success: true,
      carName: req.body.carName,
    });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to remove a car
exports.removeCar = async (req, res) => {
  try {
    // Find and delete the car based on the ID provided in the request body
    await Product.findOneAndDelete({ id: req.body.id });

    // Send a success response
    res.json({
      success: true,
      carName: req.body.carName,
    });
  } catch (error) {
    console.error("Error removing car:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// function for getting all products
exports.getAllCars = async (req, res) => {
  try {
    let cars = await Product.find();
    console.log("All Products Fetched !!");
    res.send(cars);
  } catch (error) {
    console.error("Error fetching all cars:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// Creating API for getting car details with id

exports.getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Requested ID:", id);

    const car_info = await Product.findOne({ id: id });
    console.log("Retrieved car info:", car_info);

    if (!car_info) {
      return res.status(404).send({ message: "Car not found" });
    }
    res.json(car_info);
    console.log("Details fetched !!");
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Creating API for updating car details by id

exports.updateCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      carName,
      image,
      year,
      offerType,
      discountedPrice,
      oldPrice,
      type,
      condition,
      mileage,
      model,
      description,
      make,
      transmission,
      fuelType,
      token_no,
      door,
      cylinder,
      color,
      drive_Type,
      seats,
      engine_Size,
    } = req.body;

    const updatecar = await Product.findByIdAndUpdate(
      { _id: id },
      {
        carName,
        image,
        year,
        offerType,
        discountedPrice,
        oldPrice,
        type,
        condition,
        mileage,
        model,
        description,
        make,
        transmission,
        fuelType,
        token_no,
        door,
        cylinder,
        color,
        drive_Type,
        seats,
        engine_Size,
      }
    );
    res.json(updatecar);
    console.log("Car Detail Updated");
  } catch (error) {
    console.error("Error updating car details:", error);
    res.status(500).send({ message: "Internal Server Error while updating" });
  }
};

// Creating API for fetching makes of cars
exports.getAllMakes = async (req, res) => {
  try {
    const makes = await Product.find({}, "make");
    res.json(makes);
  } catch (error) {
    console.error("Error fetching makes:", error);
    res.status(500).send({
      message: "Internal Server Error while fetching makes",
    });
  }
};

// function for getting types of car

exports.getAllTypes = async (req, res) => {
  try {
    const makes = await Product.find({}, "type");
    res.json(makes);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).send({
      message: "Internal Server Error while fetching makes",
    });
  }
};

exports.addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { carId } = req.body;
  try {
    const user = await Users.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === carId);
    if (alreadyAdded) {
      const updatedUser = await Users.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: carId },
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } else {
      const updatedUser = await Users.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: carId },
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get models based on make
exports.getMakes = async (req, res) => {
  try {
    const make = req.params.make;
    const models = await Product.find({ make: make });
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get car details by make, model and year
exports.getByMakeModelYear = async (req, res) => {
  try {
    // Extract make, model, and year from the request query parameters
    const { make, model, year } = req.body;

    // Fetch the car details based on make, model, and year
    const carDetails = await Product.findOne({ make, model, year });

    if (!carDetails) {
      return res.status(404).json({ message: "Car not found" });
    }

    // If car details found, send them in the response
    res.json(carDetails);
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

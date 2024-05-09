const express = require("express");
const router = express.Router();
const carController = require("../controllers/productController");

// Route for adding a new car
router.post("/addcar", carController.addCar);

// Route for removing a car
router.post("/removecar", carController.removeCar);

// Route for getting all cars
router.get("/allcars", carController.getAllCars);

// Route for getting car details by ID
router.get("/car/:id", carController.getCarById);

// Route for updating car details by ID
router.put("/updatecar/:id", carController.updateCarById);

// Route for getting all makes of cars
router.get("/makes", carController.getAllMakes);

// Route for getting all types of cars
router.get("/types", carController.getAllTypes);

router.post("/wishlist", carController.addToWishlist);
router.get("/models/:make", carController.getMakes);
router.get("/:make/:model/:year", carController.getByMakeModelYear);
module.exports = router;

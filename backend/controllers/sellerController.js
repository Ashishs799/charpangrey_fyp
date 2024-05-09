const Seller = require("../models/seller");

exports.addSeller = async (req, res) => {
  try {
    const {
      seller,
      email,
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
    const new_seller = await Seller.create({
      seller,
      email,
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
    });

    console.log("Seller Added Successfully");
    res.status(200).json({
      success: true,
      data: new_seller,
      message: "Seller Added Successfully",
    });
  } catch (error) {
    console.log("Error on adding seller !!");
    res.status(400).json({
      success: false,
      data: "Error in adding seller",
      message: error.message,
    });
  }
};

exports.getAllSeller = async (req, res) => {
  try {
    // Fetch all comments from the database
    const sellers = await Seller.find();
    console.log("Seller Fetched !!");
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error Fetching Seller !!");
  }
};

//Importing bcrypt for hashing password
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

// User Registration Endpoint
const signUp = async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with the same email address !!",
      });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    await user.save();
    const data = {
      user: {
        id: user.id,
      },
    };
    // Creating token
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// User Login Endpoint
const login = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        // Generating token
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token, id: user._id });
      } else {
        res.json({
          success: false,
          errors: "Wrong Password !! Please try again.",
        });
      }
    } else {
      res.json({
        success: false,
        errors: "Wrong Email Address !!",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// function for getting all users
const allUsers = async (req, res) => {
  try {
    const users = await Users.find();
    console.log("Retrieved users: ", users);

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Controller for getting a single comment by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
      console.log("User not found !!");
    }

    res.json(user);
    console.log("User Found !!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, carId } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.wishlist.includes(carId)) {
      user.wishlist.push(carId);
      await user.save();
    }
    res.status(200).json({ message: "Car added to wishlist" });
    console.log("Car added to wishlist");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, carId } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Convert carId to string for comparison
    const stringCarId = String(carId);
    // Filter the wishlist array to remove the carId
    user.wishlist = user.wishlist.filter((id) => String(id) !== stringCarId);
    await user.save();
    res.status(200).json({ message: "Car removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params; 
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  signUp,
  login,
  allUsers,
  getUserById,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};

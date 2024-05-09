const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User registration route
router.post("/signup", userController.signUp);

// User login route
router.post("/login", userController.login);

// routes for all users
router.get("/allusers", userController.allUsers);

router.get("/user/:id", userController.getUserById);

//For wishlist
router.post("/wishlist/add", userController.addToWishlist);
router.post("/wishlist/remove", userController.removeFromWishlist);
router.get("/wishlist/:userId", userController.getWishlist);
module.exports = router;

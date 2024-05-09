// controllers/commentController.js

const Review = require("../models/review");
const Users = require("../models/users");
const Car = require("../models/car");

// Create a new comment
exports.makeReview = async (req, res) => {
  try {
    const { reviewer, car, text } = req.body;

    // Create a new comment
    const newReview = new Review({
      reviewer,
      car,
      text,
    });

    // Save the comment to the database
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
    console.log("Review Saved Successfully !!");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in Review is\n", err);
  }
};


// Controller for getting all comments
exports.getAllReviews = async (req, res) => {
  try {
    // Fetch all comments from the database
    const reviews = await Review.find();

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller for getting a single comment by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (review === null) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller for updating a review
exports.updateReview = async (req, res) => {
  try {
    const { text } = req.body;

    // Find the comment by ID and update its text
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true } // Return the updated document
    );

    if (updatedReview === null) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller for deleting a comment
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (deletedReview === null) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
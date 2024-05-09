// routes/commentRoutes.js

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/review", reviewController.makeReview);
router.get("/reviews", reviewController.getAllReviews);
router.get("/review/:id", reviewController.getReviewById);
router.put("/review/:id", reviewController.updateReview);
router.delete("/review/:id", reviewController.deleteReview);
module.exports = router;

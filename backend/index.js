// Required Dependencies
// const port = 4000;
const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.array("car", 5), (req, res) => {
  const imageUrls = req.files.map((file) => {
    return `http://localhost:${PORT}/images/${file.filename}`;
  });
  res.json({
    success: 1,
    image_url: imageUrls,
  });
});

const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const sellerRoutes = require("./routes/sellerRoutes");

app.use("/api/users", userRoutes);

app.use("/api/cars", carRoutes);

app.use("/api/booking", bookingRoutes);
app.use("/api", reviewRoutes);
app.use("/api", sellerRoutes);
app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server Running on Port ", PORT);
  } else {
    console.log("Error Occured :" + error);
  }
});

app.get("/", (req, res) => {
  res.send("CHAARPANGREY BACKEND IS RUNNING SUCCESSFULLY !!");
});

const db = require("./config/db");
db();

const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {console.log("Database of charpangrey connected successfully !!")})
    .catch((error) => {console.log("Error while connecting database !!", error)});
};

module.exports = db;
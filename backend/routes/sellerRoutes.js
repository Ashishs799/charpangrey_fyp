const express = require("express");
const router = express.Router();

const sellerController = require("../controllers/sellerController");

router.post("/sellcar", sellerController.addSeller);
router.get("/allsellers", sellerController.getAllSeller);

module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
router.get("/", (req, res) => {
  Product.find({}, (err, product) => {
    if (err) {
      res.json({
        status: 500
      });
    } else {
      res.json(product);
    }
  });
});

module.exports = router;

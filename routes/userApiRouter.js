const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const Product = require("../models/Product.js");

router.get("/", (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});
router.get("/", (req, res) => {
  Product.find({}, (err, product) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(product);
    }
  });
});

module.exports = router;

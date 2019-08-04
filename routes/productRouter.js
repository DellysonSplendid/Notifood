const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product.js");
const { ensureAuthenticated } = require("../config/auth");

const passport = require("passport");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", (req, res) => {
  Product.find({}, err => {
    if (err) {
      res.json(err);
    }
  })
    .sort({ date: "desc" })
    .then(products => {
      res.render("product", {
        title: "Products Available",
        products: products
      });
    });
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("addProduct", {
    title: "Add Product"
  });
});

router.post("/", upload.single("productImage"), (req, res) => {
  const { price, productName, location, quality, type } = req.body;
  let product = new Product({
    productName: productName,
    price: price,
    location: location,
    quality: quality,
    type: type,
    user: req.user.id,
    productImage: req.file.path
  });
  product.save(err => {
    if (err) {
      res.render("error", {
        title: "Error"
      });
    } else {
      req.flash("success_msg", " Product Added Successfully");
      res.redirect("/");
    }
  });
});

router.get("/:id", (req, res) => {
  let condition = { _id: req.params.id };
  Product.findOne(condition, (err, products) => {
    if (err) {
      throw err;
    }
    res.render("product-info", {
      products,
      title: "Products Info"
    });
  });
});

module.exports = router;

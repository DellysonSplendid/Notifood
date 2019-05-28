const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product.js");

const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

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
  Product.find({}, (err, products) => {
    if (err) {
      res.json(err);
    }
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
    productImage: req.file.path
  });
  product.save(err => {
    if (err) {
      res.render("error", {
        title: "Error"
      });
    } else {
      res.render("success");
    }
  });
});

router.put("/:id", (req, res) => {
  let condition = { _id: req.params.id };
  Product.update(condition, req.body).then(doc => {
    if (!doc) {
      return res.status(400).end();
    }
    return res.status(200).json(doc);
  });
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove({ _id: req.params.id }).then(product => {
    res.json(product);
  });
});

router.get("/:id", (req, res) => {
  let condition = { _id: req.params.id };
  Product.findOne(condition, (err, products) => {
    if (err) {
      throw err;
    }
    res.render("product-info", {
      products
    });
  });
});
router.get("/:page", (req, res, next) => {
  let perPage = 6;
  let page = req.params.page || 1;
  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec(function(err, count) {
        if (err) return next(err);
        res.render("product", {
          products: products,
          current: page,
          page: Math.ceil(count / perPage)
        });
      });
    });
});

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/User.js");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register"
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profileUpload/");
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

router.post("/register", upload.single("profilePicture"), (req, res) => {
  // Do some Validations
  const { email, password, password2 } = req.body;
  let user = new User({
    email: email,
    password: password,
    password2: password2,
    profilePicture: req.file.path
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      user.password = hash;
      user
        .save()
        .then(user => {
          res.redirect("/login");
        })
        .catch(err => [console.log(err)]);
    });
  });
});
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});

module.exports = router;

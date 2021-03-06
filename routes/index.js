const express = require("express");
const User = require("../models/User.js");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});
// Registration
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register"
  });
});

// router.get("/login", (req, res) => {
//   res.render("login", {
//     title: "Login"
//   });
// });

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
  const { email, password, password2 } = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      title: "Register",
      errors,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          email: email,
          password: password,
          profilePicture: req.file.path
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/login");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/products/add",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});
module.exports = router;

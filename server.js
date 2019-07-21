const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;
const path = require("path");
const route = require("./Routes/index");
const userRoute = require("./Routes/user");
const productRouter = require("./Routes/productRouter.js");
const userApiRouter = require("./Routes/userApiRouter.js");
const productsApiRouter = require("./Routes/productsApiRouter.js");
const config = require("./config/database.js");
const passport = require("passport");
require("./config/passport")(passport);
// routes  = require('./routes'),

app = express();
mongoose
  .connect(config.MongoURI, { useNewUrlParser: true })
  .then(done => console.log("mongodB conected"))
  .catch(err => {
    console.log(err);
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "ilovecoding",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.set("view engine", "ejs");
app.use("/uploads", express.static("uploads"));
app.use("/profileUpload", express.static("profileUpload"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// Morgan
app.use(morgan("dev"));
// Routes
app.use("/", require("./Routes/index"));
app.use("/register", userRoute);
app.use("/login", userRoute);
app.use("/user/profile", require("./Routes/user"));
//
// User Api Routes
app.use("/api/users", userApiRouter);
app.use("/api/products", productsApiRouter);
// Food Routes
app.use("/products/view", productRouter);
app.use("/products/", productRouter);
app.use("/products/view/delete", productRouter);

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}...`);
});

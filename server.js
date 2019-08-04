const express = require("express");
const session = require("express-session");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;
const path = require("path");
const route = require("./routes/index");
const userRoute = require("./routes/user");
const productRouter = require("./routes/productRouter.js");
const userApiRouter = require("./routes/userApiRouter.js");
const productsApiRouter = require("./routes/productsApiRouter.js");
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
  res.locals.user = req.user;
  next();
});
// Morgan
app.use(morgan("dev"));
// Routes

app.use("/", route);
app.use("/register", userRoute);
app.use("/login", userRoute);
app.use("/user/profile", require("./routes/user"));
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

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;
const path = require("path");
const route = require("./Routes/index");
const productRouter = require("./Routes/productRouter.js");
const userApiRouter = require("./Routes/userApiRouter.js");
const productsApiRouter = require("./Routes/productsApiRouter.js");
const config = require("./config/database.js");

// routes  = require('./routes'),
app = express();
mongoose
  .connect(config.MongoURI, { useNewUrlParser: true })

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
    cookie: { secure: true }
  })
);
app.set("view engine", "ejs");
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

// Routes
app.use("/", route);
app.use("/register", route);
app.use("/login", route);
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

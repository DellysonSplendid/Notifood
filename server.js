const express = require("express");
const sass = require("node-sass-middleware");
const PORT = process.env.PORT || 3000;
const path = require("path");
const route = require("./routes/index");

// routes  = require('./routes'),
app = express();

app.use(
  sass({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    outputStyle: "compressed",
    debug: true
  })
);
app.set("view engine", "ejs");
express.static(path.join(__dirname, "public"));

// Routes
app.use("/", route);
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}...`);
});

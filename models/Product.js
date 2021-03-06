const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    required: false,
    type: String
  },
  location: {
    required: false,
    type: String
  },
  price: {
    required: false,
    type: String
  },
  user: {
    type: String,
    required: true
  },
  type: {
    required: false,
    type: String
  },
  quality: {
    required: false,
    type: String
  },
  productImage: {
    required: false,
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;

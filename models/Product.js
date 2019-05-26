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
  }
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;

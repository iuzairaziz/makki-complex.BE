var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
  name: String,
  price: String,
});

var productModel = mongoose.model("product", ProductSchema);

module.exports = productModel;

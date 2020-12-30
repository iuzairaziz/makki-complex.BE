const { number } = require("joi");
var mongoose = require("mongoose");

var AdvertismentSchema = mongoose.Schema({
  NameOfOrganiztion: String,
  NameOfBrand: String,
  Name: String,
  Phone: String,
  Title: String,
  Email: String,
  MediumRequired: String,
  Duration: Number,
  Quantity: Number,
  TotalPKR: Number,
});

var Advertisment = mongoose.model("Advertisment", AdvertismentSchema);

module.exports = Advertisment;

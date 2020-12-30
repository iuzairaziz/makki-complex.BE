var express = require("express");
var router = express.Router();
var Advertisment = require("../model/Advertisment");
var checkSessionAuth = require("../middleware/checkSessionAuth");

/* GET home page. */
router.get("/", async function (req, res, next) {
  var products = await productModel.find();
  res.render("products/list", { products });
});
router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/addProduct");
});

router.post("/", async function (req, res, next) {
  var advertisment = new Advertisment();

  advertisment.NameOfOrganiztion = req.body.nameOfOrganiztion;
  advertisment.NameOfBrand = req.body.nameOfBrand;
  advertisment.Name = req.body.name;
  advertisment.Phone = req.body.phone;
  advertisment.Title = req.body.title;
  advertisment.Email = req.body.email;
  advertisment.MediumRequired = req.body.mediumRequired;
  advertisment.Duration = req.body.duration;
  advertisment.Quantity = req.body.quantity;
  advertisment.TotalPKR = req.body.TotalPKR;
  await advertisment.save();
  res.send(advertisment);
});

router.get("/delete/:id", async function (req, res, next) {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

router.get("/edit/:id", async function (req, res, next) {
  var id = req.params.id;
  var products = await productModel.findById(id);
  res.render("products/edit", { products });
});

router.post("/edit/:id", async function (req, res, next) {
  var data = req.body;
  var products = await productModel.findById(req.params.id);
  products.name = data.name;
  products.price = data.price;
  await products.save();
  res.redirect("/products");
});

router.get("/:id", async function (req, res, next) {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

router.get("/cart/:id", async function (req, res, next) {
  var product = await productModel.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");
});

router.get("/cart/delete/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((m) => m._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;

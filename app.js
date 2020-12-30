var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var productsRouter = require("./routes/products");
var AdvertismentRouter = require("./routes/Advertisment");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mongoose = require("mongoose");
var session = require("express-session");
var cors = require("cors");
var sessionAuth = require("./middleware/sessionAuth");
var app = express();
app.use(cors());
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.set("trust proxy", 1); // trust first proxy

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionAuth);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/Advertisment", AdvertismentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
mongoose
  .connect(
    "mongodb+srv://iuzair:uzi466809066@cluster0.sxlvj.mongodb.net/iuzair?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
module.exports = app;

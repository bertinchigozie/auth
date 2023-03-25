const express = require("express");
const userRoute = require("./routes/userRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

const CustomError = require("./util/customError");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/v1/users", userRoute);

app.get("/", (req, res) => {
  res.end("Hello World");
});
app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on the server`, 404));
});

module.exports = app;

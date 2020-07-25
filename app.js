const express = require("express");
const app = express();
const cors = require("cors");
const AppError = require("./utils/appError");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require("./routes/authRoute");
app.use("/api/users", authRoute);

const pageRoute = require("./routes/pageRoute");
app.use("/api/pages", pageRoute);

// Unhandled routes
app.all("*", (req, res, next) => {
  return next(new AppError("Route not found", 404));
});

// Global error handler
const globalErrorHandler = require("./utils/globalErrorHandler");
app.use(globalErrorHandler);

module.exports = app;

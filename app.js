const express = require("express");
const app = express();
const cors = require("cors");
const AppError = require("./utils/appError");

app.use(express.json());
app.use(cors());

const authRoute = require("./routes/authRoute");
app.use("/api/users", authRoute);

// Unhandled routes
app.all("*", (req, res, next) => {
  return next(new AppError("Route not found", 404));
});

// Global error handler
const globalErrorHandler = require("./utils/globalErrorHandler");
app.use(globalErrorHandler);

module.exports = app;

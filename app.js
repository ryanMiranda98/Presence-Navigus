const express = require("express");
const app = express();
const cors = require("cors");
const AppError = require("./utils/appError");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require("./routes/authRoute");
const pageRoute = require("./routes/pageRoute");

app.use("/api/users", authRoute);
app.use("/api/pages", pageRoute);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Unhandled routes
// app.all("*", (req, res, next) => {
//   return next(new AppError("Route not found", 404));
// });

// Global error handler
const globalErrorHandler = require("./utils/globalErrorHandler");
app.use(globalErrorHandler);

module.exports = app;

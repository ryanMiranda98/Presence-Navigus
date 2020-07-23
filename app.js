const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const authRoute = require("./routes/authRoute");
app.use("/api/users", authRoute);

module.exports = app;

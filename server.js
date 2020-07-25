const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config({ path: path.join(__dirname, "config.env") });
const config = require("config");
const app = require("./app");

const mongoose = require("mongoose");
mongoose
  .connect(config.get("DB_URI"), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected successfully"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (req, res) => {
  console.log(`Server running on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Error", err.message);
  console.log("Server shutting down!");
  server.close(() => {
    process.exit(1);
  });
});

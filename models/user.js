const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please reenter password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.verifyPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

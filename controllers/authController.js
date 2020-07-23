const User = require("../models/user");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new AppError("User with provided email already exists", 400));
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      data: { newUser, token },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please enter email and password", 400));
    }

    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.verifyPassword(password, user.password))) {
      return next(
        new AppError("Email or password is invalid! Please try again.", 400)
      );
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      data: { token },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// later move to users controller: get user by id
exports.loadUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Middleware to check if user has access
exports.protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("No authorization token found", 401));
  }

  const token = req.headers.authorization.split(" ")[1];
  // check for valid token -- promisify
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  // check if user having token still exists
  const user = await User.findById(decode.id);
  if (!user) {
    return next(new AppError("No user found with that token", 401));
  }
  req.user = user;
  req.token = token;
  next();
};

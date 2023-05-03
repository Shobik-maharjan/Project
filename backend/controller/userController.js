const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.status(200).json({
      message: "User Registered",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "user already exist",
      // message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  // try {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
};

// exports.logout = async (req, res) => {};

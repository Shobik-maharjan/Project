const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password, gender, phone } =
      req.body;

    const usernameCheck = await User.findOne({ username });

    //Username and Email validation
    if (usernameCheck) {
      console.log("username already exits");
      return res.status(500).json({
        status: false,
        message: "Username already used",
      });
    }
    const emailcheck = await User.findOne({ email });
    if (emailcheck) {
      return res.status(500).json({
        status: false,
        message: "Email already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      phone,
    });
    return res.status(200).json({
      status: true,
      message: "User Registered",
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "An Error Occured",
      // message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken;
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "The User is logged out",
  });
};

//update password
exports.updatePassword = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(500).json({
      message: "Old password is incorrect",
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({
    message: "Password updated successfully",
  });
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await user.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {}
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User is deleted",
  });
};

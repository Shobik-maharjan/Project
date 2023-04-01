const mongoose = require("mongoose");
// const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
});

module.exports = mongoose.model("User", userSchema);

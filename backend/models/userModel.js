const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  firstName: {
    type: String,
    require: true,
    min: 3,
  },
  lastName: {
    type: String,
    require: true,
    min: 3,
  },
  type: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be greater than 8 Characters"],
  },
  gender: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    maxlength: 10,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: true,
  },
  avatarImage: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png",
  },
});

module.exports = mongoose.model("User", userSchema);

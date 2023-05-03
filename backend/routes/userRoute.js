const express = require("express");
const { createUser, login } = require("../controller/userController");
const router = express.Router();

router.route("/").post(createUser);
router.route("/login").get(login);
// router.route("/logout").get(logout);

module.exports = router;

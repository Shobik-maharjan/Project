const express = require("express");
const {
  createUser,
  login,
  logout,
  getAllUsers,
  getUser,
  deleteUser,
  updatePassword,
} = require("../controller/userController");
const router = express.Router();

router.route("/").post(createUser);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/getUser").get(getAllUsers);
router.route("/getUser/:id").get(getUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/updatePassword").put(updatePassword);

module.exports = router;

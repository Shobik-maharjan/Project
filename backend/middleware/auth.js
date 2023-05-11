// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// exports.isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies["token"];
//     if (!token) {
//       return res.status(404).json({
//         success: false,
//         message: "Please Login to comtinue",
//       });
//     }
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decodedData.id);
//     req.user = user;
//     console.log(req.user);
//     next();
//   } catch (e) {
//     return res.status(500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };

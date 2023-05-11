const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

const userRouter = require("./routes/userRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRouter);

module.exports = app;

const app = require("./app");
const connectDB = require("./config/databaseConfig");
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server Started in port ${process.env.PORT}`);
});

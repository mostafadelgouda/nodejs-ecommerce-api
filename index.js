const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
dotenv.config({ path: ".env" });
PORT = process.env.PORT;
MODE = process.env.MODE;

dbConnection();

const app = express();
app.use(express.json());

app.use("/api/v1/categories", categoryRoute);
if (MODE == "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${MODE}`);
}
app.get("/", (req, res) => {
  res.send("Our Apiii");
});
app.listen(PORT, () => {
  console.log("App running on port: ", PORT);
});

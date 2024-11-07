const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");

const ApiError = require("./utils/apiError");
const globalErrorHandling = require("./middlewares/errorMiddleware");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || "development";

dbConnection();

const app = express();

if (MODE === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${MODE}`);
}

app.use(express.json());

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// @desc Global error handling middleware for express
app.use(globalErrorHandling);

const server = app.listen(PORT, () => {
  console.log("App running on port: ", PORT);
});

// @desc handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down....");
    process.exit(0);
  });
});

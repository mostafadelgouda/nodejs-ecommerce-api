import { NextFunction, Request, Response } from "express";
import dbConnection from "./config/database"
import globalErrorHandling from"./middlewares/errorMiddleware";
const express: any = require("express");
const dotenv: any = require("dotenv");
const morgan: any = require("morgan");
const categoryRoute: any = require("./routes/categoryRoute");
const subCategoryRoute: any = require("./routes/subCategoryRoute");
const brandRoute: any = require("./routes/brandRoute");
const productRoute: any = require("./routes/productRoute");

const ApiError: any = require("./utils/apiError");


dotenv.config({ path: ".env" });
const PORT: Number = Number(process.env.PORT || 3000);
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
app.use("/api/v1/products", productRoute);
app.all("*", (req: Request, res: Response, next: any) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// @desc Global error handling middleware for express
app.use(globalErrorHandling);

const server = app.listen(PORT, () => {
  console.log("App running on port: ", PORT);
});

// @desc handle rejection outside express
process.on("unhandledRejection", (err: Error) => {
  console.log(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down....");
    process.exit(0);
  });
});

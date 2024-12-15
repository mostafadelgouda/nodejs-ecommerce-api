import { NextFunction, Request, Response } from "express";
import dbConnection from "./config/database"
import globalErrorHandling from"./middlewares/errorMiddleware";
import express from "express";
import dotenv from "dotenv";
import categoryRoute from "./routes/categoryRoute";
import subCategoryRoute from "./routes/subcategoryRoute";
import brandRoute from "./routes/brandRoute";
import productRoute from "./routes/productRoute";
import ApiError from "./utils/apiError";

const morgan: any = require("morgan");

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

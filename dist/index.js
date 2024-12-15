"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./config/database"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const ApiError = require("./utils/apiError");
dotenv.config({ path: ".env" });
const PORT = Number(process.env.PORT || 3000);
const MODE = process.env.MODE || "development";
(0, database_1.default)();
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
app.all("*", (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// @desc Global error handling middleware for express
app.use(errorMiddleware_1.default);
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

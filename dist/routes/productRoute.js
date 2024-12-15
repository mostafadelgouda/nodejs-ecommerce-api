"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, } = require("../services/productService");
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator, } = require("../utils/validators/productValidator");
const router = express_1.default.Router();
router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
    .route("/:id")
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);
module.exports = router;
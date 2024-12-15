"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.deleteProductValidator = exports.createProductValidator = exports.getProductValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.getProductValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid product id format"),
    validatorMiddleware_1.default,
];
exports.createProductValidator = [
    (0, express_validator_1.check)("title")
        .notEmpty()
        .withMessage("Product required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Name length should be between 3 and 100"),
    (0, express_validator_1.check)("description")
        .notEmpty()
        .withMessage("Product description is required")
        .isLength({ min: 3, max: 2000 })
        .withMessage("Product description must be between 3 and 2000"),
    (0, express_validator_1.check)("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Product price must be a number")
        .isLength({ max: 32 })
        .withMessage("Product price length must be at most 32"),
    (0, express_validator_1.check)("quantity")
        .isEmpty()
        .isNumeric()
        .withMessage("Product quantity must be a number")
        .withMessage("Product quantity is required"),
    (0, express_validator_1.check)("sold")
        .optional()
        .isNumeric()
        .withMessage("Sold Products must be a number"),
    (0, express_validator_1.check)("priceAfterDiscount")
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage("Price after discount must be a number")
        .custom((value, meta) => {
        const req = meta.req; // Explicitly cast meta.req to Request
        if (value >= req.body.price) {
            throw new Error("Price after discount must be less than product price");
        }
        return true;
    }),
    (0, express_validator_1.check)("colors")
        .optional()
        .isArray()
        .withMessage("Colors must be an array of strings"),
    (0, express_validator_1.check)("imageCover").notEmpty().withMessage("Image cover is required"),
    (0, express_validator_1.check)("images")
        .optional()
        .isArray()
        .withMessage("Images must be an array of strings"),
    (0, express_validator_1.check)("category")
        .isEmpty()
        .withMessage("Category is required")
        .isMongoId()
        .withMessage("Category id format is not valid"),
    (0, express_validator_1.check)("subcategory")
        .optional()
        .isMongoId()
        .withMessage("Subcategory id format is not valid"),
    (0, express_validator_1.check)("brand")
        .optional()
        .isMongoId()
        .withMessage("Brand id format is not valid"),
    (0, express_validator_1.check)("ratingAverage")
        .optional()
        .isNumeric()
        .withMessage("Rating average should be a number")
        .isLength({ min: 1, max: 5 })
        .withMessage("Rating average should be between 1 and 5"),
    (0, express_validator_1.check)("ratingQuantity")
        .optional()
        .isNumeric()
        .withMessage("Rating quantity should be a number"),
    validatorMiddleware_1.default,
];
exports.deleteProductValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid product id format"),
    validatorMiddleware_1.default,
];
exports.updateProductValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid product id format"),
    validatorMiddleware_1.default,
];

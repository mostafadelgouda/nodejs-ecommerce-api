"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubCategoryValidator = exports.deleteSubCategoryValidator = exports.createSubCategoryValidator = exports.getSubCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.getSubCategoryValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid subcategory id format"),
    validatorMiddleware_1.default,
];
exports.createSubCategoryValidator = [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Subcategory required")
        .isLength({ min: 3, max: 32 })
        .withMessage("Name length should be between 3 and 32"),
    (0, express_validator_1.check)("category").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware_1.default,
];
exports.deleteSubCategoryValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid subcategory id format"),
    validatorMiddleware_1.default,
];
exports.updateSubCategoryValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid subcategory id format"),
    validatorMiddleware_1.default,
];

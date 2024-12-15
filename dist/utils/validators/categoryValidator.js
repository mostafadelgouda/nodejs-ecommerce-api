"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidator = exports.deleteCategoryValidator = exports.createCategoryValidator = exports.getCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.getCategoryValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware_1.default,
];
exports.createCategoryValidator = [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Category required")
        .isLength({ min: 3, max: 32 })
        .withMessage("Name length should be between 3 and 32"),
    validatorMiddleware_1.default,
];
exports.deleteCategoryValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware_1.default,
];
exports.updateCategoryValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware_1.default,
];

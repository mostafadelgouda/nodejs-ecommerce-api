"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandValidator = exports.deleteBrandValidator = exports.createBrandValidator = exports.getBrandValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.getBrandValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware_1.default,
];
exports.createBrandValidator = [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("Brand required")
        .isLength({ min: 3, max: 32 })
        .withMessage("Name length should be between 3 and 32"),
    validatorMiddleware_1.default,
];
exports.deleteBrandValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware_1.default,
];
exports.updateBrandValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware_1.default,
];

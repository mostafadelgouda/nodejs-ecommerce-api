import { check /*, body, param*/ } from "express-validator";
import validatorMiddleware from"../../middlewares/validatorMiddleware";

export const getSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

export const createSubcategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Subcategory required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name length should be between 3 and 32"),
  check("category").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

export const deleteSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

export const updateSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

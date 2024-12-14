import { check /*, body, param*/ } from "express-validator";
import validatorMiddleware from"../../middlewares/validatorMiddleware";

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Subcategory required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name length should be between 3 and 32"),
  check("category").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

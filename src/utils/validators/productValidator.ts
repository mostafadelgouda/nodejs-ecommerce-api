import { check, CustomValidator, Meta } from "express-validator";
import { Request } from "express";
import validatorMiddleware from "../../middlewares/validatorMiddleware";

export const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

export const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name length should be between 3 and 100"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 3, max: 2000 })
    .withMessage("Product description must be between 3 and 2000"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Product price length must be at most 32"),
  check("quantity")
    .isEmpty()
    .isNumeric()
    .withMessage("Product quantity must be a number")
    .withMessage("Product quantity is required"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Sold Products must be a number"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Price after discount must be a number")
    .custom((value, meta: Meta) => {
      const req = meta.req as Request; // Explicitly cast meta.req to Request
      if (value >= req.body.price) {
        throw new Error("Price after discount must be less than product price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors must be an array of strings"),
  check("imageCover").notEmpty().withMessage("Image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array of strings"),
  check("category")
    .isEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Category id format is not valid"),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Subcategory id format is not valid"),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Brand id format is not valid"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("Rating average should be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("Rating average should be between 1 and 5"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Rating quantity should be a number"),

  validatorMiddleware,
];

export const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

export const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

import { Router } from "express";
import {
  createFilterObject,
  setCategoryToBody,
  createSubcategory,
  getSubcategory,
  getSubcategories,
  deleteSubcategory,
  updateSubcategory,
} from "../services/subcategoryService";
import {
  getSubcategoryValidator,
  createSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} from "../utils/validators/subcategoryValidator";

const router: Router = Router({ mergeParams: true });

// Routes for Subcategories
router
  .route("/")
  .post(setCategoryToBody, createSubcategoryValidator, createSubcategory) // Spread validators
  .get(createFilterObject, getSubcategories);

router
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory) // Spread validators
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

export default router;

import { Router } from "express";
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidator";
import subcategoriesRoute from "./subcategoryRoute";

const router: Router = Router();

// Nested routes for subcategories
router.use("/:categoryId/subcategories", subcategoriesRoute);

// Route for categories
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory); // Spread validators to avoid type issues

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export default router;

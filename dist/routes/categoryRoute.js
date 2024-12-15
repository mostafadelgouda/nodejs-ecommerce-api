"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getCategories, createCategory, getCategory, updateCategory, deleteCategory, } = require("../services/categoryService");
const { getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, } = require("../utils/validators/categoryValidator");
const subcategoriesRoute = require("./subCategoryRoute");
const router = (0, express_1.Router)();
router.use("/:categoryId/subcategories", subcategoriesRoute);
router
    .route("/")
    .get(getCategories)
    .post(createCategoryValidator, createCategory);
router
    .route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;

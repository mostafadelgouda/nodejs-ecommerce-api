const express = require("express");
const {
  createFilterObject,
  setCategoryToBody,
  createSubCategory,
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} = require("../services/subCategoryService");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;

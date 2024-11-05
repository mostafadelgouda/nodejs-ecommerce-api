const express = require("express");
const { createSubCategory } = require("../services/subCategoryService");
const {
  //   getSubCategoryValidator,
  createSubCategoryValidator,
  //   updateSubCategoryValidator,
  //   deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router.route("/").post(createSubCategoryValidator, createSubCategory);

module.exports = router;

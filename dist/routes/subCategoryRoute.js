"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createFilterObject, setCategoryToBody, createSubCategory, getSubCategory, getSubCategories, deleteSubCategory, updateSubCategory, } = require("../services/subCategoryService");
const { getSubCategoryValidator, createSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator, } = require("../utils/validators/subCategoryValidator");
const router = express_1.default.Router({ mergeParams: true });
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

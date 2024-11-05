const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
// @desc Get list of Categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  const categories = await Category.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(201).json({ results: categories.length, page, categories });
});

// @desc Get Category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError("No category found for this id", 404));
  }
  res.status(200).json({ data: category });
});

// @desc Create Category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update Category by id
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );
  if (!category) {
    return next(new ApiError("No category found for this id", 404));
  }
  res.status(200).json({ data: category });
});

// @desc Delete Category by id
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError("No category found for this id", 404));
  }
  res.status(200).json({ data: category });
});

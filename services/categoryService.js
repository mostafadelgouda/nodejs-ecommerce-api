const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc Get list of Categories
// @route GET /api/v1/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(201).json(categories);
});

// @desc Create Category
// @route POST /api/v1/categories
// @access Private
const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

module.exports = {
  getCategories,
  createCategory,
};

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createFilterObject = (req, res, next) => {
  let filter = {};

  if (req.params.categoryId) filter = { category: req.params.categoryId };
  req.filterObj = filter;
  next();
};

// @desc Create SubCategory
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  console.log(req.body.category);
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc Get list of SubCategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  console.log(req.params.categoryId);
  //let filter = {};

  const subCategories = await SubCategory.find(req.filterObj)
    .skip((page - 1) * limit)
    .limit(limit);
  //.populate({ path: "Category", select: "name -_id" });
  res.status(201).json({ results: subCategories.length, page, subCategories });
});

// @desc Get SubCategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError("No category found for this id", 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Update SubCategory by id
// @route PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError("No category found for this id", 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Delete SubCategory by id
// @route DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError("No category found for this id", 404));
  }
  res.status(200).json({ data: subCategory });
});

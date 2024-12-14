const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// @desc Get list of Brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  const brands = await Brand.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(201).json({ results: brands.length, page, brands });
});

// @desc Get Brand by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError("No brand found for this id", 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc Update Brand by id
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError("No brand found for this id", 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Delete Brand by id
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError("No brand found for this id", 404));
  }
  res.status(200).json({ data: brand });
});

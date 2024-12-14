const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

// @desc Get list of Products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  const products = await Product.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(201).json({ results: products.length, page, products });
});

// @desc Get product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError("No product found for this id", 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update product by id
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.name);
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError("No product found for this id", 404));
  }
  res.status(200).json({ data: product });
});

// @desc Delete product by id
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError("No product found for this id", 404));
  }
  res.status(200).json({ data: product });
});

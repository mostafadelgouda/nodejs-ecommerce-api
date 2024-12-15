import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import ApiError from "../utils/apiError";

// @desc Get list of Products
// @route GET /api/v1/products
// @access Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const limit: number = parseInt(req.query.limit as string, 10) || 5;
  const page: number = parseInt(req.query.page as string, 10) || 1;

  const products = await Product.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({ results: products.length, page, products });
});

// @desc Get product by id
// @route GET /api/v1/products/:id
// @access Public
export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError("No product found for this id", 404));
    }

    res.status(200).json({ data: product });
  }
);

// @desc Create product
// @route POST /api/v1/products
// @access Private
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  req.body.slug = slugify(req.body.name);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update product by id
// @route PUT /api/v1/products/:id
// @access Private
export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.name);

    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!product) {
      return next(new ApiError("No product found for this id", 404));
    }

    res.status(200).json({ data: product });
  }
);

// @desc Delete product by id
// @route DELETE /api/v1/products/:id
// @access Private
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new ApiError("No product found for this id", 404));
    }

    res.status(200).json({ data: product });
  }
);

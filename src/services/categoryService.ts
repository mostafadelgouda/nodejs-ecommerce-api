import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel";
import ApiError from "../utils/apiError";

// @desc Get list of Categories
// @route GET /api/v1/categories
// @access Public
export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const limit: number = parseInt(req.query.limit as string, 10) || 5;
  const page: number = parseInt(req.query.page as string, 10) || 1;

  const categories = await Category.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({ results: categories.length, page, categories });
});

// @desc Get Category by id
// @route GET /api/v1/categories/:id
// @access Public
export const getCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return next(new ApiError("No category found for this id", 404));
    }

    res.status(200).json({ data: category });
  }
);

// @desc Create Category
// @route POST /api/v1/categories
// @access Private
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
    slug: slugify(name),
  });

  res.status(201).json({ data: category });
});

// @desc Update Category by id
// @route PUT /api/v1/categories/:id
// @access Private
export const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      return next(new ApiError("No category found for this id", 404));
    }

    res.status(200).json({ data: category });
  }
);

// @desc Delete Category by id
// @route DELETE /api/v1/categories/:id
// @access Private
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return next(new ApiError("No category found for this id", 404));
    }

    res.status(200).json({ data: category });
  }
);

import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import SubCategory from "../models/subCategoryModel";
import ApiError from "../utils/apiError";

declare global {
  namespace Express {
    interface Request {
      filterObj?: Record<string, unknown>;
    }
  }
}

// Middleware: Set category ID to request body if not provided
export const setCategoryToBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Middleware: Create filter object for querying subcategories
export const createFilterObject = (req: Request, res: Response, next: NextFunction) => {
  let filter: Record<string, unknown> = {};
  if (req.params.categoryId) filter = { category: req.params.categoryId };
  req.filterObj = filter;
  next();
};

// @desc Create SubCategory
// @route POST /api/v1/subcategories
// @access Private
export const createSubcategory = asyncHandler(async (req: Request, res: Response) => {
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
export const getSubcategories = asyncHandler(async (req: Request, res: Response) => {
  const limit: number = parseInt(req.query.limit as string, 10) || 5;
  const page: number = parseInt(req.query.page as string, 10) || 1;

  const filter = req.filterObj || {};
  const subCategories = await SubCategory.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({ results: subCategories.length, page, subCategories });
});

// @desc Get SubCategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
export const getSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return next(new ApiError("No category found for this id", 404));
    }

    res.status(200).json({ data: subCategory });
  }
);

// @desc Update SubCategory by id
// @route PUT /api/v1/subcategories/:id
// @access Private
export const updateSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// @desc Delete SubCategory by id
// @route DELETE /api/v1/subcategories/:id
// @access Private
export const deleteSubcategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const subCategory = await SubCategory.findByIdAndDelete(id);

    if (!subCategory) {
      return next(new ApiError("No category found for this id", 404));
    }

    res.status(200).json({ data: subCategory });
  }
);

import slugify from "slugify";
import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel";
import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";
// @desc Get list of Brands
// @route GET /api/v1/brands
// @access Public
export const getBrands = asyncHandler(async (req: Request, res: Response) => {
  const limit: number = parseInt(req.query.limit as string, 10) || 5;
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const brands = await Brand.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(201).json({ results: brands.length, page, brands });
});

// @desc Get Brand by id
// @route GET /api/v1/brands/:id
// @access Public
export const getBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    if (!brand) {
      return next(new ApiError("No brand found for this id", 404));
    }

    res.status(200).json({ data: brand });
  }
);

// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const brand = await Brand.create({
    name,
    slug: slugify(name),
  });

  res.status(201).json({ data: brand });
});

// @desc Update Brand by id
// @route PUT /api/v1/brands/:id
// @access Private
export const updateBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// @desc Delete Brand by id
// @route DELETE /api/v1/brands/:id
// @access Private
export const deleteBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return next(new ApiError("No brand found for this id", 404));
    }

    res.status(200).json({ data: brand });
  }
);
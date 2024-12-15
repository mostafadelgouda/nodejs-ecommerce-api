import { Router } from "express";
import {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} from "../services/brandService";
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator";

const router = Router();
router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;

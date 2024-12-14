const express = require("express");
const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator";

const router = express.Router();
router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;

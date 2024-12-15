"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getBrands, createBrand, getBrand, updateBrand, deleteBrand, } = require("../services/brandService");
const brandValidator_1 = require("../utils/validators/brandValidator");
const router = express.Router();
router.route("/").get(getBrands).post(brandValidator_1.createBrandValidator, createBrand);
router
    .route("/:id")
    .get(brandValidator_1.getBrandValidator, getBrand)
    .put(brandValidator_1.updateBrandValidator, updateBrand)
    .delete(brandValidator_1.deleteBrandValidator, deleteBrand);
module.exports = router;

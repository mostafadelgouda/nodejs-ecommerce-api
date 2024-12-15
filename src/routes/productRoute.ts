import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validators/productValidator";

const router: Router = Router();

// Routes for products
router.route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct); // Spread validators for middleware compatibility

router.route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;

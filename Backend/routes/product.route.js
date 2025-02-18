import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post("/add_product", verifyToken, addProduct);
router.put("/update_product/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;

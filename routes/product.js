import { Router } from "express";
import middleware from "../middleware.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.get("/", middleware, getProducts);

productRouter.post("/add", middleware, addProduct);

productRouter.put("/update/:productId", middleware, updateProduct);

productRouter.delete("/:productId", middleware, deleteProduct);

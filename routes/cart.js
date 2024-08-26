import { Router } from "express";
import {
  createCart,
  deleteProductFromCart,
  getCart,
  updateCart,
} from "../controllers/cart.controller.js";
import middleware from "../middleware.js";

export const cartRouter = Router();

cartRouter.get("/", middleware, getCart);

cartRouter.post("/add", middleware, createCart);

cartRouter.put("/update", middleware, updateCart);

cartRouter.delete("/delete", middleware, deleteProductFromCart);

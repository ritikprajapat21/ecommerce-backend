import { Router } from "express";
import {
  addOrder,
  getOrderById,
  getOrders,
} from "../controllers/order.controller.js";
import middleware from "../middleware.js";

export const orderRouter = Router();

orderRouter.get("/", middleware, getOrders);

orderRouter.get("/customer/:customerId", middleware, getOrderById);

orderRouter.post("/add", middleware, addOrder);

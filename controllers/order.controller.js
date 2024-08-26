import mongoose from "mongoose";
import { Order, User } from "../db/schema.js";

export const addOrder = async (req, res) => {
  try {
    const { address } = req.body;
    const user = req.user;

    const order = await Order.create({
      user: new mongoose.Types.ObjectId(user),
      shipping: { address },
    });

    return res
      .status(201)
      .json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const user = req.userId;

    const orders = await Order.find({ user })
      .populate("user", "-password")
      .exec();

    if (orders.length == 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.json(orders);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const user = await User.findById(userId);

    if (user.role != "admin") {
      throw new Error("You do not have permission.");
    }

    const orders = await Order.find().populate("user", "-password").exec();

    return res.json({ orders });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

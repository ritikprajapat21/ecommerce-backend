import mongoose from "mongoose";
import { Product } from "../db/schema.js";

export const getProducts = async (_req, res) => {
  try {
    const products = await Product.find().select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    return res.json({ products });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
    });

    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      new mongoose.Types.ObjectId(productId),
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(new mongoose.Types.ObjectId(productId));

    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

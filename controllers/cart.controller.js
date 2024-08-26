import { Cart } from "../db/schema.js";
import mongoose from "mongoose";

export const getCart = async (req, res) => {
  try {
    const user = req.userId;
    if (!user) {
      throw new Error("Token is required");
    }

    const cart = await Cart.find({ user: new mongoose.Types.ObjectId(user) })
      .populate("items.product_id")
      .exec();

    return res.json({ cart });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const { items } = req.body;
    const user = req.userId;
    const products = items.map((item) => {
      if (!item.productId) {
        throw new Error("Product Id is required");
      }

      return {
        product_id: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity,
      };
    });

    const cart = await Cart.create({
      user: new mongoose.Types.ObjectId(user),
      items: products,
    });

    const populateCart = await Cart.findById(cart._id)
      .populate("items.product_id")
      .exec();

    return res
      .status(201)
      .json({ message: "Added to cart", cart: populateCart });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const user = req.userId;
    const { items } = req.body;
    const products = items
      .map((item) => {
        if (item.quantity > 0) {
          return {
            product_id: new mongoose.Types.ObjectId(item.productId),
            quantity: item.quantity,
          };
        }
      })
      .filter((item) => item != null);

    const updatedCart = await Cart.findOneAndUpdate(
      { user: new mongoose.Types.ObjectId(user) },
      { items: products },
      { new: true, runValidators: true },
    ).populate("items.product_id");

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.json({
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({ error: error.message });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const user = req.userId;
    const { product_id } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === product_id,
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

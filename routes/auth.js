import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/schema.js";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      address,
      role,
    });

    const { __v, createdAt, updatedAt, password: pwd, ...userInfo } = user._doc;

    return res.status(201).json({ message: "User created", user: userInfo });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({ error: "Email already taken" });
    }
    return res.status(400).json({ error: error.message });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      throw new Error("Password is required");
    }

    const foundUser = await User.findOne({ email }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      throw new Error("Invalid credentials");
    }

    const { password: pass, ...user } = foundUser.toJSON();

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN,
      { expiresIn: "5d" },
    );

    return res.json({ user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
});

import jwt from "jsonwebtoken";
import { User } from "./db/schema.js";

export default async function middleware(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const details = await jwt.verify(token, process.env.TOKEN);

    req.userId = details.userId;

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

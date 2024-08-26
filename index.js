import express from "express";
import cors from "cors";
import { createConnection } from "./db/index.js";
import { authRouter } from "./routes/auth.js";
import { cartRouter } from "./routes/cart.js";
import { productRouter } from "./routes/product.js";
import { orderRouter } from "./routes/order.js";
import env from "dotenv";

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");
app.use(cors());

app.use("/", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(3000, async () => {
  const connection = await createConnection();
  if (connection) {
    console.log("Listening at port 3000");
  } else {
    console.log("Could not connect to database");
  }
});

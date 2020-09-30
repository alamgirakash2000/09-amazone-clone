import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

import productsRoutes from "./routes/productsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/products", productsRoutes);
app.use("/api/order", orderRoutes);

// DB configurable

const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ninue.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("DB is connected"));

// API Routes
app.get("/", (req, res) =>
  res.status(200).send(" Hi!! This server is running")
);

// listen
app.listen(port, () => console.log(`Listening on port ${port}`));

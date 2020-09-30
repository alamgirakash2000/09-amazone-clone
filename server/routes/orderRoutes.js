import express from "express";
import orderModel from "../models/orderModel.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  const email = req.params.email;

  let orders;
  try {
    orders = await orderModel.find({ email: email });
  } catch (e) {
    res.status(500).send(e.message);
    return;
  }

  res.status(201).send(orders);
});

router.post("/", async (req, res) => {
  orderModel.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Order place successfully");
    }
  });
});

export default router;

import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  productModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.post("/insertMany", async (req, res) => {
  const products = req.body.products;
  productModel
    .insertMany([...products])
    .then(function () {
      res.status(200).send("Inserted");
    })
    .catch(function (error) {
      res.status(500).send("Inserted fail", error.message); // Failure
    });
});

export default router;

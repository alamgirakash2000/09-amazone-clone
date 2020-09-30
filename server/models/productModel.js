import mongoose from "mongoose";

const instance = mongoose.Schema({
  key: String,
  category: String,
  name: String,
  seller: String,
  wholePrice: String,
  priceFraction: String,
  stock: Number,
  star: Number,
  starCount: Number,
  img: String,
  url: String,
  features: Array,
  price: Number,
  shipping: Number,
});

export default mongoose.model("products", instance);

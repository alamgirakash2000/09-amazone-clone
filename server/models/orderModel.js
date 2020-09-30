import mongoose from "mongoose";

const instance = mongoose.Schema({
  email: String,
  phone: String,
  address: String,
  timestamp: Date,
  items: Array,
  price: Number,
  shipment: Number,
});

export default mongoose.model("orders", instance);

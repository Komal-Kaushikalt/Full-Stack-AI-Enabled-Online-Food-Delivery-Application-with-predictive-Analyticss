import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "Preparing"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
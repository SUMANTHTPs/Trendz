import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        amount: { type: Number, default: 1 },
        size: { type: String },
        color: { type: String },
      },
    ],
    address: { type: String, required: true },
    subTotal: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || model("Order", OrderSchema);

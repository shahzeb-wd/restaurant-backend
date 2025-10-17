import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menu",
          required: true,
        },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const CartModel = mongoose.model("cart", CartSchema);

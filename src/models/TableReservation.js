import mongoose from "mongoose";

const TableReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

export const TableReservationModel = mongoose.model(
  "TableReservation",
  TableReservationSchema
);

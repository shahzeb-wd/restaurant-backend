import mongoose from "mongoose";
import { ApiResponse } from "../../libs/apiResponse.js";
import { TableReservationModel } from "../../models/TableReservation.js";

export const UpdateTableStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId) {
      return ApiResponse.notFound(res, "Please provide a valid booking ID.");
    }

    // Step 2: Find booking first
    const booking = await TableReservationModel.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true }
    );
    if (!booking) {
      return ApiResponse.notFound(res, "No booking found with the given ID.");
    }

    return ApiResponse.success(
      res,
      "Booking Status updated successfully.",
      booking
    );
  } catch (error) {
    console.error("UpdateTableBooking Error:", error);
    return ApiResponse.serverError(res);
  }
};

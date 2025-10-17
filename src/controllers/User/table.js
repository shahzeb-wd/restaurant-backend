import mongoose from "mongoose";
import { ApiResponse } from "../../libs/apiResponse.js";
import { TableReservationModel } from "../../models/TableReservation.js";

export const BookTable = async (req, res) => {
  try {
    const { userId, tableNumber, date, time, guests, status } = req.body;

    // ✅ Validate required fields
    if (!userId || !tableNumber || !date || !time || !guests) {
      return ApiResponse.notFound(res, "All fields are required.");
    }

    // ✅ Ensure table number is within 1–10
    if (tableNumber < 1 || tableNumber > 10) {
      return ApiResponse.notFound(
        res,
        "Table number must be between 1 and 10."
      );
    }

    // ✅ Convert date & time into full Date object
    const reservationDateTime = new Date(`${date}T${time}`);

    // ✅ Define time window (1 hour before & after)
    const startWindow = new Date(
      reservationDateTime.getTime() - 60 * 60 * 1000
    ); // 1 hour before
    const endWindow = new Date(reservationDateTime.getTime() + 60 * 60 * 1000); // 1 hour after

    // ✅ Check for overlapping bookings in that window
    const existingBooking = await TableReservationModel.findOne({
      tableNumber,
      date,
      status: "Booked",
      time: {
        $gte: startWindow.toTimeString().slice(0, 5),
        $lte: endWindow.toTimeString().slice(0, 5),
      },
    });

    if (existingBooking) {
      return ApiResponse.notFound(
        res,
        `This table is already booked around ${existingBooking.time}. Please choose another time.`
      );
    }

    // ✅ Create new reservation
    const newReservation = await TableReservationModel.create({
      userId,
      tableNumber,
      date,
      time,
      guests,
      status: status || "Booked",
    });

    return ApiResponse.success(
      res,
      "Table booked successfully.",
      newReservation
    );
  } catch (error) {
    console.error("Table Booking Error:", error);
    return ApiResponse.serverError(res);
  }
};

export const GetTable = async (req, res) => {
  try {
    const GetTable = await TableReservationModel.find();
    if (GetTable.length == 0) {
      ApiResponse.notFound(res);
    }

    return ApiResponse.success(
      res,
      "Table Data Fetched Successfully.",
      GetTable
    );
  } catch (error) {
    console.error("GetTable Error:", error);
    return ApiResponse.serverError(res);
  }
};

export const UpdateTableBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { tableNumber, date, time, guests, status } = req.body;

    // Step 1: Validate booking ID
    console.log(bookingId);

    if (!bookingId) {
      return ApiResponse.notFound(res, "Please provide a valid booking ID.");
    }

    // Step 2: Find booking first
    const booking = await TableReservationModel.findById(bookingId);
    if (!booking) {
      return ApiResponse.notFound(res, "No booking found with the given ID.");
    }

    // Step 3: Update fields dynamically
    if (tableNumber) booking.tableNumber = tableNumber;
    if (date) booking.date = date;
    if (time) booking.time = time;
    if (guests) booking.guests = guests;
    if (status) booking.status = status;

    // Step 4: Save updated booking
    await booking.save();

    // Step 5: Send response
    return ApiResponse.success(res, "Booking updated successfully.", booking);
  } catch (error) {
    console.error("UpdateTableBooking Error:", error);
    return ApiResponse.serverError(res);
  }
};

export const DeleteTableBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Step 1: Validate booking ID
    if (!bookingId) {
      return ApiResponse.notFound(res, "Please provide a valid booking ID.");
    }

    // Step 2: Try deleting
    const deletedBooking = await TableReservationModel.findByIdAndDelete(
      bookingId
    );

    // Step 3: Check if found
    if (!deletedBooking) {
      return ApiResponse.notFound(res, "Booking not found with the given ID.");
    }

    // Step 4: Respond
    return ApiResponse.success(res, "Booking deleted successfully.");
  } catch (error) {
    console.error("DeleteTableBooking Error:", error);
    return ApiResponse.serverError(res);
  }
};

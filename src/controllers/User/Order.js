import mongoose from "mongoose";
import { OrderModel } from "../../models/Order.js";
import { ApiResponse } from "../../libs/apiResponse.js";

export const PlaceOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod } = req.body;

    if (!userId || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Some required fields are Missing.",
      });
    }

    const newOrder = new OrderModel.create({
      userId,
      items,
      totalAmount,
      paymentMethod,
    });
    return ApiResponse.success(res, "User Updated Successfully.", newOrder);
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return ApiResponse.serverError(res);
  }
};
export const GetAllOrder = async (req, res) => {
  try {
    const GetOrders = OrderModel.findOne();
    if (GetOrders.length == 0) {
      ApiResponse.notFound(res);
    }

    ApiResponse.success(res, "Order Fetched Successfully.", GetOrders);
    return ApiResponse.success(res, "User Updated Successfully.", newOrder);
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return ApiResponse.serverError(res);
  }
};

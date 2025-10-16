import mongoose from "mongoose";
import { OrderModel } from "../../models/Order.js";
import { ApiResponse } from "../../libs/apiResponse.js";
import { MenuModel } from "../../models/menu.js";

export const PlaceOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod } = req.body;

    if (!userId || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Some required fields are Missing.",
      });
    }

    for (const i of items) {
      const menuItem = await MenuModel.findById(i.itemId);
      if (!menuItem) {
        return res.status(400).json({
          success: false,
          message: `Menu item with ID ${i.itemId} does not exist.`,
        });
      }
    }
    const newOrder = new OrderModel({
      userId,
      items,
      totalAmount,
      paymentMethod,
    });
    await newOrder.save();
    return ApiResponse.success(res, "Order Placed Successfully.", newOrder);
  } catch (error) {
    console.error("Order Place Error:", error);
    return ApiResponse.serverError(res);
  }
};
export const GetAllOrder = async (req, res) => {
  try {
    const GetOrders = await OrderModel.findOne();
    if (GetOrders.length == 0) {
      ApiResponse.notFound(res);
    }

    return ApiResponse.success(
      res,
      "All Orders Fetched Successfully.",
      GetOrders
    );
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return ApiResponse.serverError(res);
  }
};
export const GetOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const GetOrders = await OrderModel.findById(id);
    if (!id) {
      ApiResponse.notFound(res, "Please enter a valid ID.");
    }
    if (!GetOrders) {
      ApiResponse.notFound(res, "Data not Found with the Id");
    }

    return ApiResponse.success(res, "Order Fetched Successfully.", GetOrders);
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return ApiResponse.serverError(res);
  }
};

export const UpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return ApiResponse.notFound(res, "Please enter a valid ID.");
    }

    if (!status) {
      return ApiResponse.notFound(res, "Please provide a status.");
    }

    // Validate status against enum
    const validStatuses = [
      "Pending",
      "Preparing",
      "Ready",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return ApiResponse.notFound(res, "Invalid status value.");
    }

    // Update order status
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true } // return updated document
    );

    if (!updatedOrder) {
      return ApiResponse.notFound(res, "Order not found with the given ID.");
    }

    return ApiResponse.success(
      res,
      "Status updated successfully.",
      updatedOrder
    );
  } catch (error) {
    console.error("UpdateOrderStatus Error:", error);
    return ApiResponse.serverError(res);
  }
};

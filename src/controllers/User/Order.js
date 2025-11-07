import { OrderModel } from "../../models/Order.js";
import { ApiResponse } from "../../libs/apiResponse.js";
import { MenuModel } from "../../models/menu.js";

// ✅ Place order (used by customers)
export const PlaceOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod } = req.body;

    if (!userId || !items || !totalAmount || !paymentMethod) {
      return ApiResponse.badRequest(res, "Some required fields are missing.");
    }

    // Validate menu items
    for (const i of items) {
      const menuItem = await MenuModel.findById(i.itemId);
      if (!menuItem) {
        return ApiResponse.badRequest(
          res,
          `Menu item with ID ${i.itemId} does not exist.`
        );
      }
    }

    const newOrder = new OrderModel({
      userId,
      items,
      totalAmount,
      paymentMethod,
    });
    await newOrder.save();

    return ApiResponse.success(res, "Order placed successfully.", newOrder);
  } catch (error) {
    console.error("PlaceOrder Error:", error);
    return ApiResponse.serverError(res);
  }
};

// ✅ Get all orders (admin)
export const GetAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return ApiResponse.notFound(res, "No orders found.");
    }

    return ApiResponse.success(res, "Orders fetched successfully.", orders);
  } catch (error) {
    console.error("GetAllOrder Error:", error);
    return ApiResponse.serverError(res);
  }
};

// ✅ Get single order (admin)
export const GetOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return ApiResponse.badRequest(res, "Invalid ID provided.");

    const order = await OrderModel.findById(id).populate(
      "userId",
      "name email"
    );
    if (!order) return ApiResponse.notFound(res, "Order not found.");

    return ApiResponse.success(res, "Order fetched successfully.", order);
  } catch (error) {
    console.error("GetOrder Error:", error);
    return ApiResponse.serverError(res);
  }
};

// ✅ Update order status (admin)
export const UpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) return ApiResponse.badRequest(res, "Invalid ID.");
    if (!status) return ApiResponse.badRequest(res, "Status is required.");

    const validStatuses = [
      "Pending",
      "Preparing",
      "Ready",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return ApiResponse.badRequest(res, "Invalid status value.");
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) return ApiResponse.notFound(res, "Order not found.");

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

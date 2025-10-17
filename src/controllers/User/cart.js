import mongoose from "mongoose";
import { OrderModel } from "../../models/Order.js";
import { ApiResponse } from "../../libs/apiResponse.js";
import { MenuModel } from "../../models/menu.js";
import { CartModel } from "../../models/cart.js";

export const AddCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items) {
      return res.status(400).json({
        success: false,
        message: "Some required fields are Missing.",
      });
    }

    const newCart = new CartModel({
      userId,
      items,
    });
    await newCart.save();
    return ApiResponse.success(res, "Added to Cart  Successfully.", newCart);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return ApiResponse.serverError(res);
  }
};

export const GetCart = async (req, res) => {
  try {
    const GetCart = await CartModel.find();
    if (GetCart.length == 0) {
      return ApiResponse.notFound(res);
    }

    return ApiResponse.success(res, "Card Data Fetched Successfully.", GetCart);
  } catch (error) {
    console.error("GetCart Error:", error);
    return ApiResponse.serverError(res);
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { cartId, items } = req.body;

    if (!cartId) {
      return ApiResponse.notFound(res, "Please enter a valid ID.");
    }
    if (!items) {
      return ApiResponse.notFound(
        res,
        "plz enter item value its a required field."
      );
    }

    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      { items: items },
      { new: true } // return updated document
    );

    if (!updatedCart) {
      return ApiResponse.notFound(
        res,
        "Cart Data not found with the given ID."
      );
    }

    return ApiResponse.success(res, "Cart Updated Successfully.", updatedCart);
  } catch (error) {
    console.error("UpdateCart Error:", error);
    return ApiResponse.serverError(res);
  }
};
export const DeleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return ApiResponse.notFound(res, "Please enter a valid ID.");
    }

    const updatedCart = await CartModel.findOneAndUpdate(
      { "items.itemId": itemId },
      { $pull: { items: { itemId: itemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return ApiResponse.notFound(
        res,
        "Item not found in Cart with the given ID."
      );
    }

    return ApiResponse.success(res, "Item deleted successfully.", updatedCart);
  } catch (error) {
    console.error("DeleteItem Error:", error);
    return ApiResponse.serverError(res);
  }
};
export const ClearCart = async (req, res) => {
  try {
    const cartData = await CartModel.find();

    if (cartData.length === 0) {
      return ApiResponse.notFound(res, "There is no Cart Data.");
    }

    await CartModel.deleteMany({}); // deletes ALL documents from Cart collection

    return ApiResponse.success(res, "All cart data deleted successfully.");
  } catch (error) {
    console.error("ClearCart Error:", error);
    return ApiResponse.serverError(res);
  }
};

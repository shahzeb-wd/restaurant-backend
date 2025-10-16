import { ApiResponse } from "../../libs/apiResponse.js";
import { UserModel } from "../../models/user.js";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password"); // Exclude password field

    if (!users || users.length === 0) {
      return ApiResponse.notFound(res, "No users found.");
    }

    return ApiResponse.success(res, "Users fetched successfully.", users);
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    return ApiResponse.serverError(res, "Internal server error.");
  }
};
export const BlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Allow only admin
    if (req.user.role !== "Admin") {
      return ApiResponse.unauthorized(
        res,
        "Access denied. Only admins can block users."
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      return ApiResponse.notFound(res, `User not found with this ID: ${id}`);
    }

    return ApiResponse.success(res, "User blocked successfully.", user);
  } catch (error) {
    console.error("BlockUser Error:", error);
    return ApiResponse.serverError(res, "Internal server error.");
  }
};

// 🟢 UNBLOCK USER
export const UnblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Allow only admin
    if (req.user.role !== "Admin") {
      return ApiResponse.unauthorized(
        res,
        "Access denied. Only admins can unblock users."
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    if (!user) {
      return ApiResponse.notFound(res, `User not found with this ID: ${id}`);
    }

    return ApiResponse.success(res, "User unblocked successfully.", user);
  } catch (error) {
    console.error("UnblockUser Error:", error);
    return ApiResponse.serverError(res, "Internal server error.");
  }
};

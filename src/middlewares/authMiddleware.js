import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { AdminModel } from "../models/admin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // ✅ Only from cookie

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

    let account;
    if (decoded.role === "admin") {
      account = await AdminModel.findById(decoded._id).select("-password");
    } else {
      account = await UserModel.findById(decoded._id).select("-password");
    }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
        account,
      });
    }

    req.user = account; // ✅ Attach full account info
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { AdminModel } from "../models/admin.js";
import { ApiResponse } from "../libs/apiResponse.js";

export const Login = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // ✅ First check if admin
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid password.",
        });
      }

      const token = jwt.sign(
        { _id: admin._id, email: admin.email, role: "admin" },
        process.env.JWT_SECRET || "mysecretkey",
        { expiresIn: "2h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // because localhost is not HTTPS
        sameSite: "None",
        path: "/",
        maxAge: 2 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        role: "admin",
        message: "Admin login successful.",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    }

    // ✅ Then check regular user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ⚠️ Check verification BEFORE password
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        requiresVerification: true,
        message: "Please verify your email before logging in.",
        email: user.email,
      });
    }

    // ✅ Now check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      role: "user",
      message: "Login successful.",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

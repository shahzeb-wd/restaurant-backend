import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { AdminModel } from "../models/admin.js";
import { sendVerificationCode } from "../middlewares/email.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already exists. Please login.",
      });
    }

    if (existingUser && !existingUser.isVerified) {
      const now = new Date();
      const lastSent = existingUser.verificationCodeSentAt || new Date(0);
      const diffInSeconds = (now - lastSent) / 1000;

      if (diffInSeconds < 120) {
        const waitTime = Math.ceil(120 - diffInSeconds);
        return res.status(200).json({
          success: true,
          message: `Verification code already sent. Please check your email or wait ${waitTime} seconds before requesting again.`,
        });
      }

      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      existingUser.verificationCode = verificationCode;
      existingUser.verificationCodeSentAt = now;
      existingUser.verificationCodeExpiresAt = new Date(
        now.getTime() + 2 * 60 * 1000
      );
      await existingUser.save();

      await sendVerificationCode(existingUser.email, verificationCode);

      return res.status(200).json({
        success: true,
        message: "New verification code sent. Please check your email.",
      });
    }

    const hashPass = bcrypt.hashSync(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = new UserModel({
      name,
      email,
      password: hashPass,
      isVerified: false,
      verificationCode,
      verificationCodeSentAt: new Date(),
      verificationCodeExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newUser.save();
    await sendVerificationCode(newUser.email, verificationCode);

    return res.status(200).json({
      success: true,
      message:
        "Verification code sent. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required.",
      });
    }

    const user = await UserModel.findOne({ verificationCode: code });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    // ✅ Check if code expired
    if (
      user.verificationCodeExpiresAt &&
      user.verificationCodeExpiresAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification code expired. Please request a new one.",
      });
    }

    // ✅ Verify and clear code
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeSentAt = undefined;
    user.verificationCodeExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("VerifyEmail Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const ResendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    if (user.isVerified)
      return res
        .status(400)
        .json({ success: false, message: "Already verified." });

    const now = new Date();
    const diff = (now - (user.verificationCodeSentAt || 0)) / 1000;

    if (diff < 120) {
      return res.status(400).json({
        success: false,
        message: `Please wait ${Math.ceil(
          120 - diff
        )} seconds before resending.`,
      });
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = newCode;
    user.verificationCodeSentAt = now;
    user.verificationCodeExpiresAt = new Date(now.getTime() + 2 * 60 * 1000);
    await user.save();

    await sendVerificationCode(user.email, newCode);

    return res.status(200).json({
      success: true,
      message: "New verification code sent successfully.",
    });
  } catch (error) {
    console.error("Resend Code Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const CreateAdmin = async () => {
  try {
    const adminEmail = "shahzebwd0@gmail.com";
    const adminName = "Shahzeb";
    const adminPassword = "shahzeb132";

    const existingAdmin = await AdminModel.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new AdminModel({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
    });

    await admin.save();
    console.log("🌟 Default Admin Created Successfully!");
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

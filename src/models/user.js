import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    isBlocked: { type: Boolean, default: false },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: { type: String, default: "user" },
    verificationCode: String,
    verificationCodeSentAt: Date,
    verificationCodeExpiresAt: Date,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);

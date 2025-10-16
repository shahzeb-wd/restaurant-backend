import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwoigxo8b",
  api_key: process.env.CLOUDINARY_API_KEY || "284125811646831",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Jgm9bW7FHE3UD...",
});

export default cloudinary;

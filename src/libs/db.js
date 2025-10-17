import mongoose from "mongoose";
import { CreateAdmin } from "../controllers/Auth.js";

export const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅MongoDB Connected");
    CreateAdmin();
  } catch (error) {
    console.log(error, "MongoDb not connected");
  }
};

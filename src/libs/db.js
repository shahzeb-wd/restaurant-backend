// import mongoose from "mongoose";
// import { CreateAdmin } from "../controllers/Auth.js";

// export const DbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("✅MongoDB Connected");
//     CreateAdmin();
//   } catch (error) {
//     console.log(error, "MongoDb not connected");
//   }
// };

import mongoose from "mongoose";
import { CreateAdmin } from "../controllers/Auth.js";

let isConnected = false; // cache the connection

export const DbConnect = async () => {
  if (isConnected) return; // don't reconnect on every function call
  console.log("Connecting started");
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

    // Only create admin once (optional: comment after first deploy)
    // await CreateAdmin();

    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

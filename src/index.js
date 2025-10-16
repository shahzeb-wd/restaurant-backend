// src/index.js
import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import { DbConnect } from "./libs/db.js";

dotenv.config();

// Connect to MongoDB
DbConnect();

// Choose PORT
const PORT = process.env.PORT || 5000;

// Start server locally
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

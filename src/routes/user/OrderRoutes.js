// src/routes/user/OrderRoutes.js
import express from "express";
import {
  PlaceOrder,
  GetAllOrder,
  GetOrder,
} from "../../controllers/User/Order.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const OrderRoutes = express.Router();

// Place a new order
OrderRoutes.post("/orders", verifyToken, PlaceOrder);

// Get all orders of logged-in user
OrderRoutes.get("/orders", verifyToken, GetAllOrder);

// Get specific order
OrderRoutes.get("/orders/:id", verifyToken, GetOrder);

export default OrderRoutes;

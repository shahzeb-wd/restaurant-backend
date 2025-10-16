// src/routes/admin/OrderRoutes.js
import express from "express";
import {
  GetAllOrder,
  GetOrder,
  UpdateOrderStatus,
} from "../../controllers/User/Order.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const AdminOrderRoutes = express.Router();

// Get all orders (admin)
AdminOrderRoutes.get("/orders", verifyToken, GetAllOrder);

// Get order by ID (admin)
AdminOrderRoutes.get("/orders/:id", verifyToken, GetOrder);

// Update order status (admin)
AdminOrderRoutes.put("/orders/:id/status", verifyToken, UpdateOrderStatus);

export default AdminOrderRoutes;

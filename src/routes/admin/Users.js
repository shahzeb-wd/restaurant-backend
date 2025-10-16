// src/routes/admin/OrderRoutes.js
import express from "express";
import {
  GetAllOrder,
  GetOrder,
  UpdateOrderStatus,
} from "../../controllers/User/Order.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  BlockUser,
  GetAllUsers,
  UnblockUser,
} from "../../controllers/User/User.js";

const AdminUserRoutes = express.Router();

// Get all orders (admin)
AdminUserRoutes.get("/users", verifyToken, GetAllUsers);

// Get order by ID (admin)
AdminUserRoutes.put("/users/:id/block", verifyToken, BlockUser);
AdminUserRoutes.put("/users/:id/unblock", verifyToken, UnblockUser);

export default AdminUserRoutes;

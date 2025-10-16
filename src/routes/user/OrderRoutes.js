import express from "express";
import { GetAllOrder, PlaceOrder } from "../../controllers/User/Order.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
const OrderRoutes = express.Router();
OrderRoutes.post("/orders", verifyToken, PlaceOrder);
OrderRoutes.get("/orders", verifyToken, GetAllOrder);
export default OrderRoutes;

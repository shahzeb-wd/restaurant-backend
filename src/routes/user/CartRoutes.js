import express from "express";

import { verifyToken } from "../../middlewares/authMiddleware.js";
import { GetCategory } from "../../controllers/admin/Category.js";
import {
  GetMenu,
  GetMenuByCategory,
  GetSignleMenu,
} from "../../controllers/admin/Menu.js";
import {
  AddCart,
  ClearCart,
  DeleteItem,
  GetCart,
  UpdateCart,
} from "../../controllers/User/cart.js";

const CartRoutes = express.Router();

CartRoutes.post("/cart/add", verifyToken, AddCart);

CartRoutes.get("/cart", verifyToken, GetCart);
CartRoutes.put("/cart/update", verifyToken, UpdateCart);
CartRoutes.delete("/cart/remove/:itemId", verifyToken, DeleteItem);
CartRoutes.delete("/cart/clear", verifyToken, ClearCart);

export default CartRoutes;

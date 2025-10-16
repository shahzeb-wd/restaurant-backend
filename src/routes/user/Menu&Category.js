import express from "express";

import { verifyToken } from "../../middlewares/authMiddleware.js";
import { GetCategory } from "../../controllers/admin/Category.js";
import {
  GetMenu,
  GetMenuByCategory,
  GetSignleMenu,
} from "../../controllers/admin/Menu.js";

const MenuCatRoutes = express.Router();

MenuCatRoutes.get("/categories", verifyToken, GetCategory);

MenuCatRoutes.get("/menu", verifyToken, GetMenu);
MenuCatRoutes.get("/menu/:id", verifyToken, GetSignleMenu);
MenuCatRoutes.get("/menu/category/:categoryId", verifyToken, GetMenuByCategory);

export default MenuCatRoutes;

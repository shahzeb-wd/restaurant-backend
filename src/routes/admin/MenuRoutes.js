import express from "express";
import {
  CreateMenu,
  DeleteMenu,
  GetMenu,
  UpdateMenu,
} from "../../controllers/admin/Menu.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { upload } from "../../middlewares/upload.js";

const MenuRoutes = express.Router();

MenuRoutes.post("/menu", verifyToken, upload.single("image"), CreateMenu);
MenuRoutes.get("/menu", verifyToken, GetMenu);
MenuRoutes.put("/menu/:id", verifyToken, upload.single("image"), UpdateMenu);
MenuRoutes.delete("/menu/:id", verifyToken, DeleteMenu);

export default MenuRoutes;

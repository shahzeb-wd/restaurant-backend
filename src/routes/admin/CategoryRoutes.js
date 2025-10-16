// routes/admin/CategoryRoutes.js
import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  UpdateCategory,
} from "../../controllers/admin/Category.js";

const CategoryRoutes = express.Router();

CategoryRoutes.post("/categories", verifyToken, CreateCategory);
CategoryRoutes.get("/categories", verifyToken, GetCategory);
CategoryRoutes.put("/categories/:id", verifyToken, UpdateCategory);
CategoryRoutes.delete("/categories/:id", verifyToken, DeleteCategory);

export default CategoryRoutes; // ✅ default export

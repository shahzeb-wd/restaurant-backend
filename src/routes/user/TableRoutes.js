import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";

import {
  BookTable,
  GetTable,
  UpdateTableBooking,
  DeleteTableBooking,
} from "../../controllers/User/table.js";

const TableRoutes = express.Router();

TableRoutes.post("/reservations", verifyToken, BookTable);

TableRoutes.get("/reservations", verifyToken, GetTable);

TableRoutes.put("/reservations/:bookingId", verifyToken, UpdateTableBooking);

TableRoutes.delete("/reservations/:bookingId", verifyToken, DeleteTableBooking);

export default TableRoutes;

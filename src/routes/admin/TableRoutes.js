import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";

import {
  BookTable,
  GetTable,
  UpdateTableBooking,
  DeleteTableBooking,
} from "../../controllers/User/table.js";
import { UpdateTableStatus } from "../../controllers/admin/table.js";

const TableRoutes = express.Router();

TableRoutes.get("/reservations", verifyToken, GetTable);

TableRoutes.put("/reservations/:bookingId", verifyToken, UpdateTableStatus);

export default TableRoutes;

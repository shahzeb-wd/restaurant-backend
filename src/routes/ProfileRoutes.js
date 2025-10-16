import express from "express";
import { Profile, UpdateProfile } from "../controllers/Profile.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const ProfileRoutes = express.Router();
ProfileRoutes.get("/profile", verifyToken, Profile);
ProfileRoutes.put("/profile", verifyToken, UpdateProfile);
export default ProfileRoutes;

import express from "express";
import {
  Register,
  VerifyEmail,
  ResendVerificationCode,
} from "../../controllers/Auth.js";
import { Login } from "../../controllers/Login.js";
import { Logout } from "../../controllers/logout.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { Profile, UpdateProfile } from "../../controllers/Profile.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/login", Login);
AuthRoutes.get("/profile", verifyToken, Profile);

export default AuthRoutes;

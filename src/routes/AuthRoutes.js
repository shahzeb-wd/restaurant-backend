import express from "express";
import {
  Register,
  VerifyEmail,
  ResendVerificationCode,
} from "../controllers/Auth.js";
import { Login } from "../controllers/Login.js";
import { Logout } from "../controllers/logout.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", Register);
AuthRoutes.post("/verify-email", VerifyEmail);
AuthRoutes.post("/resend-code", ResendVerificationCode);
AuthRoutes.post("/login", Login);
AuthRoutes.post("/logout", Logout);

export default AuthRoutes;

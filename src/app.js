import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
// Routes
import CategoryRoutes from "./routes/admin/CategoryRoutes.js";
import MenuRoutes from "./routes/admin/MenuRoutes.js";
import UserOrderRoutes from "./routes/user/OrderRoutes.js";
import AdminOrderRoutes from "./routes/admin/OrderRoutes.js";
import AdminUserRoutes from "./routes/admin/Users.js";
import MenuCatRoutes from "./routes/user/Menu&Category.js";
import CartRoutes from "./routes/user/CartRoutes.js";
import TableRoutes from "./routes/user/TableRoutes.js";
import AuthRoutes from "./routes/user/AuthRoutes.js";
import AuthRoutesAdmin from "./routes/admin/authRoutes.js";
import AdminTableRoutes from "./routes/admin/TableRoutes.js";
import AdminDashboardRoute from "./routes/admin/dashboardRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your local frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allows cookies to be sent
  })
);

app.use(express.json());
app.use(cookieParser());

// Test endpoint
app.post("/test", (req, res) => {
  console.log("Incoming body:", req.body);
  res.json({ received: req.body });
});

// Admin routes
app.use("/api/admin", AuthRoutesAdmin);
app.use("/api/admin", CategoryRoutes);
app.use("/api/admin", MenuRoutes);
app.use("/api/admin", AdminUserRoutes);
app.use("/api/admin", AdminTableRoutes);
app.use("/api/admin", AdminOrderRoutes);
app.use("/api/admin", AdminDashboardRoute);

// User routes
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserOrderRoutes);
app.use("/api", MenuCatRoutes);
app.use("/api", CartRoutes);
app.use("/api", TableRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🍔 Restaurant Backend API is running!");
});

export default app;

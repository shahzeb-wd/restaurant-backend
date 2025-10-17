import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import CategoryRoutes from "./routes/admin/CategoryRoutes.js";
import MenuRoutes from "./routes/admin/MenuRoutes.js";
import UserOrderRoutes from "./routes/user/OrderRoutes.js";
import AdminOrderRoutes from "./routes/admin/OrderRoutes.js";
import bodyParser from "body-parser";
import AdminUserRoutes from "./routes/admin/Users.js";
import MenuCatRoutes from "./routes/user/Menu&Category.js";
import CartRoutes from "./routes/user/CartRoutes.js";
import TableRoutes from "./routes/user/TableRoutes.js";
import AuthRoutes from "./routes/user/AuthRoutes.js";
import AuthRoutesAdmin from "./routes/admin/authRoutes.js";
import AdminTableRoutes from "./routes/admin/TableRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.post("/test", (req, res) => {
  console.log("Incoming body:", req.body);
  res.json({ received: req.body });
});

app.use("/api/admin", AuthRoutesAdmin);
app.use("/api/admin", CategoryRoutes);
app.use("/api/admin", MenuRoutes);
app.use("/api/admin", AdminUserRoutes);
app.use("/api/admin", AdminTableRoutes);
app.use("/api/admin", AdminOrderRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserOrderRoutes);
app.use("/api", MenuCatRoutes);
app.use("/api", CartRoutes);
app.use("/api", TableRoutes);

app.get("/", (req, res) => {
  res.send("🍔 Restaurant Backend API is running!");
});

app.listen(PORT, () => {
  console.log(`✅ App is Running on PORT ${PORT}`);
});

export default app;

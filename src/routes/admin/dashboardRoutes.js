import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../../models/user.js";
import { OrderModel } from "../../models/Order.js";
import { MenuModel } from "../../models/menu.js";
import { CategoryModel } from "../../models/category.js";
import { TableReservationModel } from "../../models/TableReservation.js";

const router = express.Router();
router.get("/dashboard", async (req, res) => {
  try {
    const { range } = req.query;
    let startDate;

    switch (range) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
    }

    // Fetch data in parallel
    const [orders, menuItems, users, categories] = await Promise.all([
      OrderModel.find({ createdAt: { $gte: startDate } }),
      MenuModel.find({}),
      UserModel.find({}),
      CategoryModel.find({}),
    ]);

    // Total Revenue
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Total Orders
    const totalOrders = orders.length;

    // Avg Order Value
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    // Active Menu Items
    const activeMenuItems = menuItems.filter((item) => item.isAvailable).length;

    // Total Users
    const totalUsers = users.filter((u) => !u.isBlocked).length;

    // Low Inventory Items
    const lowInventoryItems = menuItems.filter(
      (item) => item.isAvailable && item.inventory < 25
    );

    // Top Selling Items
    const topSellingAgg = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!topSellingAgg[item.name])
          topSellingAgg[item.name] = { sales: 0, revenue: 0 };
        topSellingAgg[item.name].sales += item.qty;
        topSellingAgg[item.name].revenue += item.qty * item.price;
      });
    });
    const topSellingItems = Object.entries(topSellingAgg)
      .map(([name, data]) => ({
        name,
        sales: data.sales,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Hourly Performance
    const hourlyData = Array.from({ length: 24 }, (_, hour) => {
      const ordersInHour = orders.filter(
        (o) => new Date(o.createdAt).getHours() === hour
      );
      return {
        hour: `${hour}:00`,
        orders: ordersInHour.length,
        revenue: ordersInHour.reduce((sum, o) => sum + o.totalAmount, 0),
      };
    });

    // Category Performance
    const categoryPerformance = await Promise.all(
      categories.map(async (cat) => {
        const itemsInCat = menuItems.filter((i) =>
          i.categoryId.equals(cat._id)
        );
        const ordersOfCat = orders.filter((o) =>
          o.items.some((item) =>
            itemsInCat.some((i) => i._id.equals(item.itemId))
          )
        );
        const revenue = ordersOfCat.reduce((sum, o) => {
          const itemsOfCat = o.items.filter((item) =>
            itemsInCat.some((i) => i._id.equals(item.itemId))
          );
          return sum + itemsOfCat.reduce((s, i) => s + i.price * i.qty, 0);
        }, 0);
        return {
          name: cat.name,
          items: itemsInCat.length,
          orders: ordersOfCat.length,
          revenue,
        };
      })
    );

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        activeMenuItems,
        totalUsers,
        topSellingItems,
        lowInventoryItems,
        hourlyData,
        categoryPerformance,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;

import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ GET POPULAR DISHES
router.get("/popular", async (req, res) => {
  try {
    const orders = await Order.find();

    let itemCount = {};

    // count frequency
    orders.forEach(order => {
      order.items.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name] += item.qty;
        } else {
          itemCount[item.name] = item.qty;
        }
      });
    });

    // convert to array
    let sorted = Object.entries(itemCount)
      .sort((a, b) => b[1] - a[1]);

    res.json(sorted.slice(0, 5)); // top 5 items

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI failed" });
  }
});




router.get("/recommend/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    let itemCount = {};

    // count user's items
    orders.forEach(order => {
      order.items.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name] += item.qty;
        } else {
          itemCount[item.name] = item.qty;
        }
      });
    });

    // sort
    let sorted = Object.entries(itemCount)
      .sort((a, b) => b[1] - a[1]);

    res.json(sorted.slice(0, 3)); // top 3 personalized

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Recommendation failed" });
  }
});


router.get("/analytics", async (req, res) => {
  try {
    const orders = await Order.find();

    let totalOrders = orders.length;
    let totalRevenue = 0;
    let itemCount = {};

    orders.forEach(order => {
      totalRevenue += order.total;

      order.items.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name] += item.qty;
        } else {
          itemCount[item.name] = item.qty;
        }
      });
    });

    let mostPopular = Object.entries(itemCount)
      .sort((a, b) => b[1] - a[1])[0];

    res.json({
      totalOrders,
      totalRevenue,
      mostPopular
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Analytics failed" });
  }
});
export default router;
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ PLACE ORDER
router.post("/place", async (req, res) => {
  const { userId, items, total } = req.body;

  const newOrder = new Order({
    userId,
    items,
    total
  });

  await newOrder.save();

  res.json({ message: "Order placed ✅" });
});



// ✅ GET USER ORDERS
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

router.put("/update/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({ message: "Status updated ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed ❌" });
  }
});
export default router;
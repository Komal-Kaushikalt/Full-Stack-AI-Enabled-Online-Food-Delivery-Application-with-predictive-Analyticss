import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// GET all restaurants
router.get("/", async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
});

// ADD restaurant
router.post("/add", async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  await newRestaurant.save();
  res.json({ message: "Restaurant added ✅" });
});

export default router;
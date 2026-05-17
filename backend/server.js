import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";


dotenv.config();

const app = express(); // ✅ FIRST create app

app.use(cors());
app.use(express.json());



// ✅ ROUTES (AFTER app is created)
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// ✅ DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ START SERVER
app.listen(5000, () => console.log("Server running"));
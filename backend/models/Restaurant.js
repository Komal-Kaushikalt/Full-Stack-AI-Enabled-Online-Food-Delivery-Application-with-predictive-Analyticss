import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  menu: [
    {
      name: String,
      price: Number,
      image: String
    }
  ]
});

export default mongoose.model("Restaurant", restaurantSchema);
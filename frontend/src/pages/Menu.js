import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Menu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((c) => c.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart ");
};

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/restaurants`
    );

    // find selected restaurant
    const selected = res.data.find((r) => r._id === id);
    setRestaurant(selected);
  };


  if (!restaurant) return <h2>Loading...</h2>;

 return (
  <div className="menu-page">
    <h1 className="menu-title"> {restaurant.name} Menu</h1>

    <div className="menu-container">
      {restaurant.menu.map((item, index) => (
        <div className="menu-card" key={index}>
          
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name}
            className="menu-img"
          />

          <div className="menu-info">
            <h3>{item.name}</h3>
            <p className="menu-price">₹{item.price}</p>

            <button
              className="add-btn"
              onClick={() => addToCart(item)}
            >
              Add to Cart 
            </button>
          </div>

        </div>
      ))}
    </div>
  </div>
);
}

export default Menu;
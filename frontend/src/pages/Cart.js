import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
const [message, setMessage] = useState("");

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateQty = (index, type) => {
    let updated = [...cart];

    if (type === "inc") updated[index].qty += 1;
    if (type === "dec" && updated[index].qty > 1) updated[index].qty -= 1;

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const navigate = useNavigate();
const placeOrder = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login required ❌");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  localStorage.setItem("checkoutCart", JSON.stringify(cart));
  navigate("/payment");
};

  const removeItem = (index) => {
    let updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

return (
  <div className="cart-page">

    <h1 className="cart-title">Your Cart </h1>

    {message && <p className="success-msg">{message}</p>}

    {cart.length === 0 ? (
      <h2 className="empty-cart">Your cart is empty </h2>
    ) : (
      <>
        <div className="cart-container">
          {cart.map((item, index) => (
            <div className="cart-card" key={index}>

              {/* IMAGE */}
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="cart-img"
              />

              {/* DETAILS */}
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>

                <div className="qty-box">
                  <button onClick={() => updateQty(index, "dec")}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(index, "inc")}>+</button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                ❌
              </button>

            </div>
          ))}
        </div>

        {/* TOTAL + ORDER */}
        <div className="cart-footer">
          <h2>Total: ₹{total}</h2>

          <button className="order-btn" onClick={placeOrder}>
            Place Order 
          </button>
        </div>
      </>
    )}

  </div>
);
}

export default Cart;
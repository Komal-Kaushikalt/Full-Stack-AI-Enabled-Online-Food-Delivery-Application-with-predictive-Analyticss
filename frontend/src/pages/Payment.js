import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    setCart(data);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

const handlePlaceOrder = async () => {
  if (method === "COD") {
    try {
      await axios.post("http://localhost:5000/api/orders/place", {
        userId: "demoUser",
        items: cart,
        total,
        paymentMethod: "COD",
      });

      alert("Order placed with Cash on Delivery ✅");

      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutCart");

      navigate("/orders");
    } catch (err) {
      alert("Order failed ❌");
    }
  } else {
    handleRazorpayPayment(); // 👈 call next function
  }
};

const handleRazorpayPayment = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount: total }
    );

    const options = {
      key: "YOUR_KEY_ID",
      amount: data.amount,
      currency: "INR",
      name: "Food Delivery App",
      description: "Order Payment",
      order_id: data.id,

      handler: async function (response) {
        alert("Payment successful ✅");

        await axios.post("http://localhost:5000/api/orders/place", {
          userId: "demoUser",
          items: cart,
          total,
          paymentMethod: "ONLINE",
          paymentId: response.razorpay_payment_id,
        });

        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutCart");

        navigate("/orders");
      },

      theme: {
        color: "#ff5722",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    alert("Payment failed ❌");
  }
};

  const confirmOrder = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/orders/place", {
        userId: "demoUser",
        items: cart,
        total,
        paymentMethod: method
      });

      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutCart");

      alert("Payment successful ✅");

      navigate("/orders");
    } catch (err) {
      alert("Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">

      <h1>Payment 💳</h1>

      <div className="payment-card">

        <h3>Total Amount: ₹{total}</h3>

        <h4>Select Payment Method</h4>

        <div className="payment-options">

  <label className="pay-option">
    <input
      type="radio"
      value="COD"
      checked={method === "COD"}
      onChange={(e) => setMethod(e.target.value)}
    />
    Cash on Delivery
  </label>

  <label className="pay-option">
    <input
      type="radio"
      value="ONLINE"
      onChange={(e) => setMethod(e.target.value)}
    />
    Pay Online (UPI / Card / Netbanking)
  </label>

</div>

        <button className="pay-btn" onClick={handlePlaceOrder}>
  {method === "COD" ? "Place Order" : "Pay Now"}
</button>

      </div>

    </div>
  );
}

export default Payment;
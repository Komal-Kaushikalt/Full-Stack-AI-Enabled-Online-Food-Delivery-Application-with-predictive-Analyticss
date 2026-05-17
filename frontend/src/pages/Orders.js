import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/demoUser"
      );
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 return (
  <div className="orders-page">

    <h1 className="orders-title">Your Orders </h1>

    {orders.length === 0 ? (
      <h2 className="empty-orders">No orders yet </h2>
    ) : (
      <div className="orders-container">

        {orders.map((order, index) => (
          <div className="order-card" key={index}>

            {/* TOP */}
            <div className="order-header">
              <h3 className="order-status">{order.status}</h3>
              <span className="order-total">₹{order.total}</span>
            </div>

            {/* ITEMS */}
            <div className="order-items">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} × {item.qty}
                </p>
              ))}
            </div>

            {/* FOOTER */}
            <div className="order-footer">
              <button className="reorder-btn">
                Reorder 🔁
              </button>
            </div>

          </div>
        ))}

      </div>
    )}

  </div>
);
}

export default Orders;
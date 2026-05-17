import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/ai/analytics");
    setData(res.data);
  };

return (
  <div className="dashboard-page">

    <h1 className="dashboard-title">Analytics Dashboard </h1>

    <div className="dashboard-cards">

      {/* TOTAL ORDERS */}
      <div className="dash-card">
        <h3>Total Orders</h3>
        <p>{data.totalOrders || 0}</p>
      </div>

      {/* TOTAL REVENUE */}
      <div className="dash-card">
        <h3>Total Revenue</h3>
        <p>₹{data.totalRevenue || 0}</p>
      </div>

      {/* MOST POPULAR */}
      <div className="dash-card">
        <h3>Most Popular Item</h3>
        {data.mostPopular ? (
          <p>
            {data.mostPopular[0]} <br />
            <span className="sub-text">
              {data.mostPopular[1]} orders
            </span>
          </p>
        ) : (
          <p>No data</p>
        )}
      </div>

    </div>

  </div>
);
}

export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";

function Home() {
  const [popular, setPopular] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

useEffect(() => {
  fetchPopular();
    fetchRecommend();
}, []);

const fetchPopular = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/ai/popular");
    setPopular(res.data);
  } catch (err) {
    console.log(err);
  }
};


const fetchRecommend = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/ai/recommend/demoUser"
    );
    setRecommend(res.data);
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/restaurants");
    setRestaurants(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false); // 🔥 IMPORTANT
  }
};



if (loading) {
  return <h2>Loading restaurants...</h2>;
}



  
return (
  <>
    {/* HERO SECTION */}
   <div
  className="hero"
  style={{
    background: `url(${bg}) center/cover no-repeat`,
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  }}
>
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)"
    }}
  ></div>

  <div className="hero-content" style={{ position: "relative", color: "white" }}>
    <h1>Delicious Food Delivered To You </h1>
    <p>Fresh meals from your favorite restaurants</p>

    <button
      className="order-btn"
      onClick={() =>
        document.getElementById("restaurants").scrollIntoView({
          behavior: "smooth"
        })
      }
    >
      Order Now
    </button>
  </div>
</div>

    {/* RESTAURANTS */}
    <div className="container" id="restaurants">
      <h1 style={{ textAlign: "center" }}> Restaurants</h1>

      <div className="grid">
        {restaurants.map((r) => (
         <div className="card" key={r._id}>
  <img
    src={r.image || "https://via.placeholder.com/300"}
    alt={r.name}
    className="card-img"
  />

  <div className="card-body">
    <h2>{r.name}</h2>
    <p>{r.location}</p>

    <p className="rating">⭐ {r.rating || "4.2"}</p>

    <div className="btn-group">
      <button onClick={() => navigate(`/menu/${r._id}`)}>
        View Menu
      </button>

      <button onClick={() => navigate("/cart")}>
        Cart 
      </button>
    </div>
  </div>
</div>
        ))}
      </div>

      <h2> Popular Dishes</h2>
      <div className="card">
        {popular.length === 0 ? (
          <p>No data yet</p>
        ) : (
          popular.map((item, i) => (
            <p key={i}>{item[0]} (Ordered {item[1]} times)</p>
          ))
        )}
      </div>

      <h2> Recommended For You</h2>
      <div className="card">
        {recommend.length === 0 ? (
          <p>No recommendations yet</p>
        ) : (
          recommend.map((item, i) => (
            <p key={i}>
              {item[0]} (You ordered {item[1]} times)
            </p>
          ))
        )}
      </div>
    </div>
  </>
);

}

export default Home;
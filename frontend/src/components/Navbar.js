import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="logo" onClick={() => navigate("/")}>
        Foodify
      </div>

      {/* RIGHT */}
      <div className="nav-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/cart")}>Cart</span>
        <span onClick={() => navigate("/orders")}>Orders</span>
        <span onClick={() => navigate("/dashboard")}>Dashboard</span>

        {!isLoggedIn ? (
          <>
            <span onClick={() => navigate("/login")}>Login</span>
            <span onClick={() => navigate("/signup")}>Signup</span>
          </>
        ) : (
          <>
              <span>
                {
              localStorage.getItem("user")
                ?.split("@")[0]     // remove domain
                   ?.slice(0, 7) + "..."
  }
</span>
            <span onClick={handleLogout}>Logout</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
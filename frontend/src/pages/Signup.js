import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      return "All fields are required ❗";
    }

    if (!form.email.includes("@")) {
      return "Enter a valid email ❗";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters ❗";
    }

    return "";
  };

  const handleSignup = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      alert("Account created successfully ");
      navigate("/login");
    } catch (err) {
      setError("Signup failed  (Email may already exist)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">
        <h2 className="auth-title">Create Account </h2>

        {error && <p className="error-msg">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          className="auth-input"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          className="auth-input"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={handleChange}
        />

        <button
          className="auth-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="auth-switch">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>

    </div>
  );
}

export default Signup;
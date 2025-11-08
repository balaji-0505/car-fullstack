import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // ✅ Base backend URL (adjust if needed)
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:30083";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ Login API (returns JWT token)
      const res = await axios.post(`${BASE_URL}/api/auth/login`, form);

      // ✅ Store JWT token in browser storage
      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful!");

      // ✅ Redirect to homepage or dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Invalid username or password.");
    }
  };

  return (
    <div className="auth-container car-theme">
      <div className="auth-box">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Use environment variable (with fallback for localhost)
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:30083";

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // ✅ Updated API URL (matches your Spring Boot backend)
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, form);
      alert("✅ " + res.data);
      navigate("/"); // redirect to login page
    } catch (err) {
      console.error("Signup error:", err);
      alert("❌ Registration failed. Username or email may already exist.");
    }
  };

  return (
    <div className="auth-container car-theme">
      <div className="auth-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

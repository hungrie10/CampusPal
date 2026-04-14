import React, { useState } from "react";
import logo from "../assets/logo.png";

function Sign_Up() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await fetch("http://localhost:4500/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.username, // 👈 matches backend
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully 🎉");

      // 🔥 Optional: auto redirect after signup
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      if(err)
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

return (
  <main className="signup-container">
    <div className="signup-box">

      {/* 🔹 Left: Logo / Branding */}
      <div className="signup-left">
        <img src={logo} alt="Logo" />
        <h2>Join Us</h2>
        <p>Have an Unforgettable Exprience</p>
      </div>

      {/* 🔹 Right: Form */}
      <div className="signup-right">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <span className="auth-switch">
            Already have an account? <a href="/login">Login</a>
          </span>
        </form>
      </div>

    </div>
  </main>
);
}

export default Sign_Up;
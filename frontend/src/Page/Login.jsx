import React, { useState } from "react";
import logo from "../assets/logo.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");

      const res = await fetch("http://localhost:4500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // ❌ If backend returns error
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Success
      console.log("Login success:", data);

      // 💾 Store JWT token
      localStorage.setItem("token", data.token);

      // (optional) store user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // 👉 redirect later (optional)
      window.location.href = "/dashboard";
    } catch (err) {
      if (err) setError("Network error. Please try again.");
    }
  };

  return (
    <main className="login-container">
      <div className="login-box">
        {/* 🔹 Logo + Caption */}
        <div className="login-header">
          <img src={logo} alt="Logo" />
          {/* <p>QuizGen</p> */}
        </div>

        {/* 🔹 Form Section */}
        <div className="login-form-section">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            {error && <p className="error">{error}</p>}

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit">Login</button>
                  </form>
        </div>
      </div>
        <br />
                  <span id="sign_up_text">Don't have an account yet? <a href="/sign_up" id="sign_up_link">Sign Up Now</a></span>
    </main>
  );
}

export default Login;

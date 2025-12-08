import React, { useState } from "react";
import axios from "axios";
import "../Admin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent browser GET navigation
    setError('');
    setLoading(true);

    try {
      // Determine endpoint based on role
      const endpoint = role === 'admin'
        ? "http://localhost:9090/api/login/admin"
        : "http://localhost:9090/api/login/customer";

      // Send login request
      const response = await axios.post(
        endpoint,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Get user data from response
      const userData = response.data.user;

      if (userData) {
        // store user info
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", response.data.token); // optional token

        // redirect based on role
        if (role === "admin") window.location.href = "/admin/dashboard";
        else window.location.href = "/NextUp";
      } else {
        setError(response.data.message || "Login failed. Check your credentials.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-logo-row">
          <span className="login-logo-text">NextUp</span>
        </div>
        <h1>Hello, welcome!</h1>
        <p>Welcome back! Are you ready to find something you’ll love?</p>
        <p>Your essentials, one click away.</p>
      </div>

      <div className="login-right">
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <h2 className="login-label">Username</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <h2 className="login-label">Password</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <h2 className="login-label">Role</h2>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="login-remember-row">
            <label className="login-remember-left">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-forgot">
              Forgot password?
            </a>
          </div>

          <div className="login-buttons">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
            <button type="button" className="btn-outline">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "../Admin.css";

const Login = () => {
  return (
    <div className="login-page">
      {/* LEFT GREEN WELCOME SIDE */}
      <div className="login-left">
        <div className="login-logo-row">
          <span className="login-logo-text">NextUp</span>
        </div>
        <h1>Hello, welcome!</h1>
        <p>Welcome back! Ready to find something you’ll love?</p>
        <p>Your essentials, one click away.</p>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="login-right">
        <h2 className="login-label">Email Address</h2>
        <input type="email" placeholder="Enter email address" />

        <h2 className="login-label">Password</h2>
        <input type="password" placeholder="Enter password" />

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
          <button className="btn-primary">Login</button>
          <button className="btn-outline">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

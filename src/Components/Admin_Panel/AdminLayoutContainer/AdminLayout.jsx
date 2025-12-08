import React from "react";
import { useNavigate } from "react-router-dom";
import "../Admin.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    // Clear session storage / token
    sessionStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="admin-shell">
      {/* TOP NAVBAR */}
      <header className="admin-header">
        <div className="admin-header-left">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="NextUp logo"
            className="admin-logo-img"
          />
          <span className="admin-logo-text">NextUp</span>
        </div>

        <nav className="admin-nav">
          <a href="/admin/orders">Orders</a>
          <a href="/admin/products">Products</a>
        </nav>

        <div className="admin-icons">
          <span>🔍</span>
          <span>👤</span>
          <button
            onClick={handleLogout}
            className="btn-logout"
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;

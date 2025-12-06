import React from "react";
import "../Admin.css";

const AdminLayout = ({ children }) => {
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
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Admin</a>
        </nav>

        <div className="admin-icons">
          <span>🔍</span>
          <span>👤</span>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="admin-main">{children}</main>

      {/* FOOTER */}
      <footer className="admin-footer">
        <div>
          <h3>NextUp</h3>
          <p>Ready to find something you’ll love?</p>
          <p>Your essentials, one click away.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Discovery</h4>
            <p>New season</p>
            <p>Most searched</p>
            <p>Most sold</p>
          </div>
          <div>
            <h4>About</h4>
            <p>Help</p>
            <p>Shipping</p>
            <p>Affiliate</p>
          </div>
          <div>
            <h4>Info</h4>
            <p>Contact us</p>
            <p>Privacy Policies</p>
            <p>Terms &amp; Conditions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;

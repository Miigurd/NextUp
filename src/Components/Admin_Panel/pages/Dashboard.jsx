import React from "react";
import "../Admin.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* TOP STATS CARDS */}
      <div className="stats-row">
        <div className="stat-card stat-card-large">
          <div className="stat-icon-emoji">📦</div>
          <div className="stat-body">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">13</span>
          </div>
        </div>

        <div className="stat-card stat-card-large">
          <div className="stat-icon-emoji">🛒</div>
          <div className="stat-body">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">26</span>
          </div>
        </div>

        <div className="stat-card stat-card-small">
          <div className="stat-icon-emoji">👥</div>
          <div className="stat-body">
            <span className="stat-label">Customers</span>
            <span className="stat-value">233</span>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS CARD */}
      <section className="card-table">
        <div className="card-table-header">
          <h2>Recent Orders</h2>
          <button className="btn-small">View Orders</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0005</td>
              <td>12</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>0004</td>
              <td>4</td>
              <td>Packed</td>
            </tr>
            <tr>
              <td>0003</td>
              <td>1</td>
              <td>Packed</td>
            </tr>
            <tr>
              <td>0002</td>
              <td>9</td>
              <td>Delivered</td>
            </tr>
            <tr>
              <td>0001</td>
              <td>3</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;

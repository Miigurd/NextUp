import React from "react";
import "../Admin.css";

const Orders = () => {
  return (
    <div className="orders-page">
      <h1>Orders</h1>
      <div className="card-table orders-card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0005</td>
              <td>1002</td>
              <td>Organic Cotton T-Shirt</td>
              <td>Apparel</td>
              <td>24.5</td>
              <td>75</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>0004</td>
              <td>1004</td>
              <td>Leather Minimalist Wallet</td>
              <td>Accessories</td>
              <td>35</td>
              <td>120</td>
              <td>Packed</td>
            </tr>
            <tr>
              <td>0003</td>
              <td>1005</td>
              <td>Stainless Steel Water Bottle</td>
              <td>Home Goods</td>
              <td>19.95</td>
              <td>200</td>
              <td>Packed</td>
            </tr>
            <tr>
              <td>0002</td>
              <td>1006</td>
              <td>Ergonomic Office Chair</td>
              <td>Furniture</td>
              <td>150.99</td>
              <td>40</td>
              <td>Delivered</td>
            </tr>
            <tr>
              <td>0001</td>
              <td>1009</td>
              <td>Professional Blender</td>
              <td>Home Goods</td>
              <td>85.5</td>
              <td>60</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

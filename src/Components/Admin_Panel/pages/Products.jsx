import React from "react";
import "../Admin.css";

const Products = () => {
  return (
    <div className="products-page">
      <h1>Product Listing</h1>
      <div className="card-table products-card">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td>Wireless Bluetooth Headset</td>
              <td>Electronics</td>
              <td>49.9</td>
              <td>150</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1002</td>
              <td>Organic Cotton T-Shirt</td>
              <td>Apparel</td>
              <td>24.5</td>
              <td>75</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1003</td>
              <td>4K Smart TV, 55-inch</td>
              <td>Electronics</td>
              <td>799</td>
              <td>25</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1004</td>
              <td>Leather Minimalist Wallet</td>
              <td>Accessories</td>
              <td>35</td>
              <td>120</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1005</td>
              <td>Stainless Steel Water Bottle</td>
              <td>Home Goods</td>
              <td>19.95</td>
              <td>200</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1006</td>
              <td>Ergonomic Office Chair</td>
              <td>Furniture</td>
              <td>150.99</td>
              <td>40</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1007</td>
              <td>High‑Performance Laptop</td>
              <td>Electronics</td>
              <td>1199</td>
              <td>15</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1008</td>
              <td>Running Shoes, Blue/Gray</td>
              <td>Apparel</td>
              <td>89.99</td>
              <td>95</td>
              <td>✏️ 🗑 👁</td>
            </tr>
            <tr>
              <td>1009</td>
              <td>Professional Blender</td>
              <td>Home Goods</td>
              <td>85.5</td>
              <td>60</td>
              <td>✏️ 🗑 👁</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="btn-primary add-product-btn">Add Product</button>
    </div>
  );
};

export default Products;

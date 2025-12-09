import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

// Shop components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import MyOrders from "./Components/MyOrders";
import Register from "./Components/Register";

// Admin panel components
import AdminLayout from "./Components/Admin_Panel/AdminLayoutContainer/AdminLayout";
import Login from "./Components/Admin_Panel/pages/Login";
import Orders from "./Components/Admin_Panel/pages/Orders";
import Products from "./Components/Admin_Panel/pages/Products";



function About() {
  return (
    <div className="page-content">
      <h1>About</h1>
      <p>This is the About page for the NextUp E-Commerce.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page-content">
      <h1>Contact Us</h1>
      <p>Reach out to us anytime & we’re happy to help!</p>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isShopRoute =
    location.pathname === "/" || location.pathname.startsWith("/NextUp");

  return (
    <div className="App">
      {/* Shop navbar only on shop pages */}
      {isShopRoute && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          {/* SHOP ROUTES */}
          {/* <Route path="/" element={<Navigate to="/NextUp" />} /> */}
          <Route path="/NextUp" element={<HomePage />} />
          <Route path="/NextUp/about" element={<About />} />
          <Route path="/NextUp/contact" element={<Contact />} />
          <Route path="/NextUp/product-list" element={<ProductList />} />
          <Route path="/NextUp/product/:id" element={<ProductDetail />} />
          <Route path="/NextUp/checkout" element={<Checkout />} />
          <Route path="/NextUp/cart" element={<Cart />} />
          <Route path="/NextUp/my-orders" element={<MyOrders />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/orders"
            element={
              <AdminLayout>
                <Orders />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminLayout>
                <Products />
              </AdminLayout>
            }
          />
        </Routes>
      </main>

      {isShopRoute && <Footer />}
    </div>
  );
}

export default App;

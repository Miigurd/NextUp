import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // clear stored user
    sessionStorage.removeItem('token'); // optional token
    navigate('/login'); // redirect to home page
  };

  return (
    <nav className="navbar">
      {/* Left Side Navbar */}
      <div className="navbar-left">
        <Link to='/NextUp' className="text-decoration-none" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="logo" />
          <span className="brand-name">NextUp</span>
        </Link>
      </div>

      {/* Center: Navbar */}
      <div className="navbar-center">
        <Link to="/NextUp/product-list" className="nav-link">Discovery</Link>
        <Link to="/NextUp/about" className="nav-link">About</Link>
        <Link to="/NextUp/contact" className="nav-link">Contact Us</Link>
      </div>

      {/* Right Side Navbar */}
      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaSearch className="icon" />
        <Link to="/NextUp/my-orders" className="text-decoration-none">
          <FaUser className="icon" />
        </Link>
        <Link to="/NextUp/cart" className="text-success text-decoration-none" style={{ display: 'flex', alignItems: 'center' }}>
          <FaShoppingCart className="icon" />
        </Link>
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="btn btn-outline-danger"
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaShoppingCart, FaBars } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        {/* Left - Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">ShopVerse</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/mens">Mens</Link>
          <Link to="/women">Women</Link>
        </div>

        {/* Right - Cart + Profile (visible on all sizes) */}
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <FaShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div
            className="hidden lg:flex items-center gap-1 cursor-pointer relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-2xl text-gray-700" />
            <span className="text-sm text-gray-800 font-medium hidden sm:inline">
              {user ? user.username : 'Guest'}
            </span>
            <HiChevronDown className="text-xl" />
          </div>

          {/* Dropdown */}
          <div
            className={`absolute right-0 top-14 w-44 bg-white border rounded-md shadow-lg py-2 transform transition-all duration-200 ease-in-out origin-top ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
              }`}
          >
            {user ? (
              <>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Order History</Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Signup</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-2xl text-gray-700" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">ShopVerse</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl text-gray-700">
            <IoMdClose />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4 text-gray-800 font-medium">
          <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setSidebarOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setSidebarOpen(false)}>About</Link>
          <Link to="/mens" onClick={() => setSidebarOpen(false)}>Mens</Link>
          <Link to="/women" onClick={() => setSidebarOpen(false)}>Women</Link>
          <hr />
          {user ? (
            <>
              <Link to="/profile" onClick={() => setSidebarOpen(false)}>Profile</Link>
              <Link to="/orders" onClick={() => setSidebarOpen(false)}>Order History</Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                  setSidebarOpen(false);
                }}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setSidebarOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setSidebarOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 py-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo / Name */}
        <div className="text-xl font-semibold text-white">
          Shop<span className="text-blue-500">Verse</span>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/products" className="hover:text-white transition">Products</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

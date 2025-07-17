import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Shop<span className="text-blue-500">Verse</span>
          </h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for everything. Great deals, fast delivery, and trusted service.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/profile" className="hover:text-white">My Account</Link></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm">📍 Jaipur, Rajasthan</p>
          <p className="text-sm">📧 vipultiwari479@gmail.com</p>
          <p className="text-sm">📞 +91 7726822683</p>

          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
            <a href="https://github.com/tiwari786" target="_blank" rel="noreferrer" className="hover:text-gray-100"><FaGithub /></a>
            <a href="mailto:vipultiwari479@gmail.com" className="hover:text-green-400"><FaEnvelope /></a>
          </div>
        </div>

      </div>

      <hr className="my-6 border-gray-700" />

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">ShopVerse</span>. Built with ❤️ by Vipul Tiwari.
      </div>
    </footer>
  );
};

export default Footer;

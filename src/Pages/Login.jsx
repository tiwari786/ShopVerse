// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('shopverse_user'));

    if (!savedUser) {
      alert('No user found. Please signup first.');
      return;
    }

    const isEmailMatch = savedUser.email === identifier;
    const isPhoneMatch = savedUser.contact === identifier;

    if ((isEmailMatch || isPhoneMatch) && savedUser.password === password) {
      login(savedUser); // send full user object to AuthContext
      navigate('/');
    } else {
      alert('Invalid credentials ❌');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email or Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

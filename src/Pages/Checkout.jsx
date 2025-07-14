import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../Features/Cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Checkout() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
    setAddresses(savedAddresses);
    if (savedAddresses.length > 0) setSelectedAddressIndex(0);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddAddress = () => {
    const { name, phone, address, city, pincode } = formData;
    if (!name || !phone || !address || !city || !pincode) {
      toast.error("Please fill all fields ❌");
      return;
    }

    const updated = [...addresses, formData];
    setAddresses(updated);
    localStorage.setItem("userAddresses", JSON.stringify(updated));
    setFormData({ name: '', phone: '', address: '', city: '', pincode: '' });
    setShowPopup(false);
    setSelectedAddressIndex(updated.length - 1);
    toast.success("Address added ✅");
  };

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("userAddresses", JSON.stringify(updated));
    setSelectedAddressIndex(updated.length > 0 ? 0 : null);
    toast.success("Address deleted 🗑️");
  };

  const handlePlaceOrder = () => {
    if (selectedAddressIndex === null) {
      toast.error("Please select an address");
      return;
    }

    const confirm = window.confirm("Are you sure you want to place the order?");
    if (!confirm) return;

    dispatch(clearCart());
    toast.success("Order Placed Successfully 🛍️");
    setTimeout(() => navigate("/thankyou"), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Your Items</h3>
        <ul className="space-y-2 max-h-64 overflow-auto">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title.slice(0, 40)} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold text-lg mt-4">Total: ${total.toFixed(2)}</div>
      </div>

      {/* Address Section */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Select Address</h3>

        {addresses.length === 0 ? (
          <p className="text-gray-600 mb-4">No address found.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {addresses.map((addr, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddressIndex === idx}
                  onChange={() => setSelectedAddressIndex(idx)}
                />
                <div className="flex-1">
                  <p className="font-semibold">{addr.name}</p>
                  <p>{addr.phone}</p>
                  <p>{addr.address}, {addr.city}, {addr.pincode}</p>
                </div>
                <button onClick={() => handleDelete(idx)} className="text-sm cursor-pointer text-red-600 underline">Delete</button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Address
        </button>

        <button
          onClick={handlePlaceOrder}
          className="ml-4 bg-green-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>

      {/* Popup for Address Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow transform transition-all duration-300 opacity-0 scale-90 animate-popup-open">
            <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
            <div className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border px-4 py-2 rounded" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-4 py-2 rounded" />
              <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border px-4 py-2 rounded" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border px-4 py-2 rounded" />
              <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border px-4 py-2 rounded" />
              <div className="flex justify-end gap-2 pt-4">
                <button onClick={() => setShowPopup(false)} className="bg-gray-300 px-4 py-2 rounded cursor-pointer">Cancel</button>
                <button onClick={handleAddAddress} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

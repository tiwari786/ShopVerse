// pages/OrderHistory.jsx
import React from 'react';

const OrderHistory = () => {
  // Later: fetch orders from backend/localStorage
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <p className="text-gray-600">You have not placed any orders yet.</p>
    </div>
  );
};

export default OrderHistory;

import React, { useEffect, useState } from 'react';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="border p-4 mb-4 rounded shadow">
            <p className="text-sm text-gray-500 mb-2">Order Date: {order.date}</p>
            <ul className="text-sm mb-2">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.title.slice(0, 30)} x {item.quantity} - ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
            <p className="text-sm mt-1 text-gray-600">
              Delivery to: {order.address.name}, {order.address.address}, {order.address.city}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

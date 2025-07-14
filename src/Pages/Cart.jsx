import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { decrementQty, incrementQty, removeFromCart } from '../Features/Cart/cartSlice';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
        <Link to="/products" className="text-blue-500 underline">
          Go to Products
        </Link>
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 ">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">🛒 Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all gap-4"
          >
            {/* LEFT: Image + Info */}
            <div className="flex items-center gap-4 flex-1">
              <Link to={`/products/${item.id}`} className="flex items-center gap-4 hover:opacity-90">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain border border-gray-200 rounded-lg"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">${item.price}</p>
                </div>
              </Link>

            </div>

            {/* CENTER: Quantity */}
            <div className="flex items-center gap-3">
              <button
                className="bg-gray-200 cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                onClick={() => dispatch(decrementQty(item.id))}
              >
                −
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button
                className="bg-gray-200 cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                onClick={() => dispatch(incrementQty(item.id))}
              >
                +
              </button>
            </div>

            {/* RIGHT: Total + Remove */}
            <div className="text-right w-32 shrink-0">
              <p className="text-lg font-semibold text-blue-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="text-red-500 cursor-pointer text-sm underline hover:text-red-700 mt-1"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>

        ))}
      </div>

      <div className="text-right mt-10">
        <h3 className="text-2xl font-bold text-gray-800">Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout">
          <button className="mt-4 cursor-pointer bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 shadow transition">
            Proceed to Checkout
          </button>
        </Link>

      </div>
    </div>

  )
}

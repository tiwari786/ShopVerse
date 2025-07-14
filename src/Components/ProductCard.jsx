import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../Features/Cart/cartSlice';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // ✅ get cart

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find(item => item.id === product.id);
    if (alreadyInCart) {
      toast.error('Item already in cart ❌');
    } else {
      dispatch(addToCart(product));
      toast.success('Item added to cart 🛒');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain mb-4"
          loading="lazy"
        />
        <h2 className="text-md font-semibold mb-2 line-clamp-2">{product.title}</h2>
        <p className="text-gray-600 text-sm mb-1">{product.category}</p>
        <p className="text-lg font-bold text-blue-600">${product.price}</p>
      </Link>

      <button
        className="mt-auto cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

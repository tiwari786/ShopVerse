import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { addToCart } from '../Features/Cart/cartSlice';
import toast from 'react-hot-toast';


export default function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true)
  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    }
    fetchProduct()
  }
  )

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find(item => item.id === products.id); // ✅
    if (alreadyInCart) {
      toast.error('Item already in cart ❌');
    } else {
      dispatch(addToCart(products)); // ✅
      toast.success('Item added to cart 🛒');
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (!products) {
    return <div>Product not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <img
        src={products.image}
        alt={products.title}
        className="w-full md:w-1/2 h-[300px] object-contain"
        loading="lazy"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-2">{products.title}</h1>
        <p className="text-gray-500 mb-1 capitalize">{products.category}</p>
        <p className="text-xl text-blue-600 font-bold mb-2">${products.price}</p>
        <p className="text-gray-700 mb-4">{products.description}</p>

        <button
          className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <div className="mt-4">
          <Link to="/products" className="text-sm text-blue-500 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'
import ProductDetail from './ProductDetail'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false)
      }
    }
    fetchProduct();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (products.length === 0) {
    return <div>No products found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {
        products.map(product => (
          <>
            <ProductCard key={product.id} product={product} />
          </>
        )
        )
      }
    </div>
  )
}

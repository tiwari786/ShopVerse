// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <Banner />
      <section className="py-8 px-4 md:px-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

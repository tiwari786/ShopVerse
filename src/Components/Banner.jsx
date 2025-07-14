import React from 'react';

const Banner = () => {
  return (
    <div className="w-full h-[250px] md:h-[350px] bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-center px-6">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold">Welcome to ShopVerse</h1>
        <p className="mt-4 text-sm md:text-lg">Best Deals on Fashion, Electronics & More!</p>
      </div>
    </div>
  );
};

export default Banner;

'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/main.css';
import SearchSection from '../search/SearchSection';
import CategoriesSection from '../categories/CategoriesSection';
import RecommendationsSection from './RecommendationsSection';
import ProductsGrid from './ProductsGrid';

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/properties', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <main className="main-container">
      <SearchSection />
      <CategoriesSection />
      <RecommendationsSection />
      <ProductsGrid products={products} />
    </main>
  );
};

export default Main;

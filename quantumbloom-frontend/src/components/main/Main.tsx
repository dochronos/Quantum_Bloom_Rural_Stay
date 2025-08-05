'use client';

import { useEffect, useState } from 'react';
import SearchSection from '../search/SearchSection';
import CategoriesSection from '../categories/CategoriesSection';
import RecommendationsSection from './RecommendationsSection';
import ProductsGrid from './ProductsGrid';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties', {
          credentials: 'include',
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
      }
    };

    fetchProducts();
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

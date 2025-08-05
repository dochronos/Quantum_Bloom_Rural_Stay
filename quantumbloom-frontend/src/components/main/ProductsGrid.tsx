'use client';

import React, { useEffect, useState } from 'react';
import styles from './productsGrid.module.css';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rating: number;
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Cabaña Río Claro',
    image: '/images/quantumbloom/river-cabin.jpg',
    price: 12000,
    description: 'Hermosa cabaña frente al río con todas las comodidades.',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Casa en el bosque',
    image: '/images/quantumbloom/forest-house.jpg',
    price: 9500,
    description: 'Retiro natural rodeado de árboles y aves.',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Estancia El Retiro',
    image: '/images/quantumbloom/countryside-house.jpg',
    price: 15000,
    description: 'Vivienda rural perfecta para relajarse en familia.',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Domo Estelar',
    image: '/images/quantumbloom/eco-dome.jpg',
    price: 13000,
    description: 'Domo ecológico con vista panorámica del cielo estrellado.',
    rating: 4.7,
  }
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    // Simular carga de datos
    setProducts(mockProducts);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className={styles.productsGrid}>
      <div className={styles.productsList}>
        {paginatedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3><a href="#">{product.name}</a></h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong> por noche</p>
              <div className={styles.rating}>⭐ {product.rating}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.paginationControls}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}

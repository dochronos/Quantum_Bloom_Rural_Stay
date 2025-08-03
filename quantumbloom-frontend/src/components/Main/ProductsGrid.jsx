'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/products-grid.css';

const ProductsGrid = ({ products = [], currentPage, setCurrentPage }) => {
  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    if (setCurrentPage) setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="products-grid">
      <div className="products-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.images?.[0] || '/images/quantumbloom/placeholder.jpg'}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = '/images/quantumbloom/placeholder.jpg';
              }}
            />
            <div className="product-info">
              <h3>
                <Link href={`/product/${product.id}`}>
                  {product.name}
                </Link>
              </h3>
              <p>Alojamiento: {product.type}</p>
              <p>Desde: {product.price}</p>
              <div className="rating">⭐ {product.rating}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>
          Inicio
        </button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Siguiente
        </button>
        <button onClick={() => paginate(pageNumbers.length)}>
          Final
        </button>
      </div>
    </div>
  );
};

export default ProductsGrid;

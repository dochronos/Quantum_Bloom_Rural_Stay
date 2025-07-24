import React from 'react';
import './ProductsGrid.css';
import { Link } from 'react-router-dom';

const ProductsGrid = ({ products, currentPage, setCurrentPage }) => {
  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              src={product.images[0]}
              alt={product.name}
              className="product-image"
              onError={(e) => (e.target.src = '/images/quantumbloom/placeholder.jpg')}
            />
            <div className="product-info">
              <h3>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
              <p>Alojamiento: {product.type}</p>
              <p>Desde: {product.price}</p>
              <div className="rating">⭐ {product.rating}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button 
          onClick={() => paginate(1)} 
          disabled={currentPage === 1}
          className="inicio"
        >
          Inicio
        </button>
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="anterior"
        >
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
          className="siguiente"
        >
          Siguiente
        </button>
        <button 
          onClick={() => paginate(pageNumbers.length)}
          className="final"
        >
          Final
        </button>
      </div>
    </div>
  );
};

export default ProductsGrid;

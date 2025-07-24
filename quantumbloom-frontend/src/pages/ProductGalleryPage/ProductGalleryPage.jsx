import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductGalleryPage.css';

const ProductGalleryPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="status-message">Cargando galería...</div>;
  if (error) return <div className="status-message error">Error: {error}</div>;
  if (!product) return <div className="status-message error">Producto no encontrado</div>;

  return (
    <div className="gallery-page">
      <h1>Galería de {product.name}</h1>
      {product.images?.length > 0 ? (
        <div className="full-gallery">
          {product.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Imagen ${index + 1} de ${product.name}`} />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay imágenes disponibles para este producto.</p>
      )}
    </div>
  );
};

export default ProductGalleryPage;

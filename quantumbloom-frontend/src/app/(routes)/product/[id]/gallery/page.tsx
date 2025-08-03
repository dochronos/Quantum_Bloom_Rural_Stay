'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './productGallery.module.css';

interface Product {
  name: string;
  images?: string[];
}

const ProductGalleryPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className={styles.statusMessage}>Cargando galería...</div>;
  if (error) return <div className={`${styles.statusMessage} ${styles.error}`}>Error: {error}</div>;
  if (!product) return <div className={`${styles.statusMessage} ${styles.error}`}>Producto no encontrado</div>;

  return (
    <div className={styles.galleryPage}>
      <h1>Galería de {product.name}</h1>
      {product.images?.length ? (
        <div className={styles.fullGallery}>
          {product.images.map((image, index) => (
            <div key={index} className={styles.galleryItem}>
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

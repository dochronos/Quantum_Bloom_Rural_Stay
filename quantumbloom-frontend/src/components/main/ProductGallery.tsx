'use client';

import React from 'react';
import Link from 'next/link';
import styles from './productGallery.module.css';

interface Product {
  id: string;
  name: string;
  images: string[];
}

interface Props {
  product: Product;
}

const ProductGallery: React.FC<Props> = ({ product }) => {
  if (!product || !product.images || product.images.length < 5) {
    return null;
  }

  const { images } = product;

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryBlock}>
        {/* Imagen principal (izquierda) */}
        <div className={styles.mainImage}>
          <img
            src={images[0]}
            alt={`Imagen principal de ${product.name}`}
          />
        </div>

        {/* Grilla de 4 imágenes (derecha) */}
        <div className={styles.gridImages}>
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className={styles.gridImage}>
              <img
                src={image}
                alt={`Imagen ${index + 1} de ${product.name}`}
              />
            </div>
          ))}
        </div>

        {/* Enlace a galería completa */}
        <div className={styles.viewMore}>
          <Link href={`/product/${product.id}/gallery`}>
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;

'use client';

import React from 'react';
import Link from 'next/link';

const ProductGallery = ({ product }) => {
  if (!product || !product.images || product.images.length < 5) {
    return null;
  }

  const { images } = product;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[500px] overflow-hidden rounded-2xl shadow-lg">
        {/* Imagen principal (izquierda) */}
        <div className="h-full">
          <img
            src={images[0]}
            alt={`Imagen principal de ${product.name}`}
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Grilla de 4 imágenes (derecha) */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="h-full">
              <img
                src={image}
                alt={`Imagen ${index + 1} de ${product.name}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enlace a galería completa */}
      <div className="text-right mt-2">
        <Link
          href={`/product/${product.id}/gallery`}
          className="text-sm text-blue-600 hover:underline"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default ProductGallery;

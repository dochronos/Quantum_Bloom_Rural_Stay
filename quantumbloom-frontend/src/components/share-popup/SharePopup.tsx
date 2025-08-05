'use client';

import React, { useState } from 'react';
import styles from '@/styles/share-popup.module.css';

type Product = {
  name: string;
  description: string;
  images: string[];
};

type SharePopupProps = {
  product: Product;
  onClose: () => void;
};

const SharePopup: React.FC<SharePopupProps> = ({ product, onClose }) => {
  const [customMessage, setCustomMessage] = useState('');

  const handleShare = (socialMedia: 'facebook' | 'twitter' | 'instagram') => {
    if (typeof window === 'undefined') return;

    const productUrl = window.location.href;
    const message = `${customMessage || 'Mirá esta cancha:'} ${productUrl}`;

    switch (socialMedia) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
          '_blank'
        );
        break;
      case 'instagram':
        alert('Para compartir en Instagram, copia el enlace y pégalo en la app.');
        break;
    }
  };

  return (
    <div
      className={styles['share-popup-overlay']}
      role="dialog"
      aria-modal="true"
      aria-label="Ventana emergente de compartir"
    >
      <div className={styles['share-popup']}>
        <h2 className={styles['share-title']}>Compartir cancha</h2>

        <div className={styles['share-content']}>
          <img
            src={product.images[0]}
            alt={`Imagen de ${product.name}`}
            className={styles['share-image']}
          />

          <p className={styles['share-description']}>{product.description}</p>

          <input
            type="text"
            placeholder="Mensaje personalizado..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className={styles['share-message-input']}
            aria-label="Mensaje personalizado"
          />
        </div>

        <div className={styles['share-buttons']}>
          <button
            onClick={() => handleShare('facebook')}
            className={`${styles['share-btn']} ${styles.facebook}`}
          >
            Facebook
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className={`${styles['share-btn']} ${styles.twitter}`}
          >
            Twitter
          </button>
          <button
            onClick={() => handleShare('instagram')}
            className={`${styles['share-btn']} ${styles.instagram}`}
          >
            Instagram
          </button>
        </div>

        <button
          onClick={onClose}
          className={styles['close-button']}
          aria-label="Cerrar ventana de compartir"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SharePopup;

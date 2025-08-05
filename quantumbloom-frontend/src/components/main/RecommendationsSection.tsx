'use client';

import React from 'react';
import styles from './recommendationsSection.module.css';

type Recommendation = {
  id: number;
  name: string;
  type: string;
  price: string;
  rating: string;
  img: string;
};

const recommendations: Recommendation[] = [
  {
    id: 1,
    name: 'Cabaña El Remanso',
    type: 'Cabaña rústica en las sierras',
    price: '$18.000/noche',
    rating: '4.9',
    img: '/images/quantumbloom/rural1.jpg',
  },
  {
    id: 2,
    name: 'Estancia La Serena',
    type: 'Casa de campo con pileta',
    price: '$25.000/noche',
    rating: '4.8',
    img: '/images/quantumbloom/rural2.jpg',
  },
  {
    id: 3,
    name: 'Refugio del Bosque',
    type: 'Tiny house entre árboles',
    price: '$20.000/noche',
    rating: '4.7',
    img: '/images/quantumbloom/rural3.jpg',
  },
];

export default function RecommendationsSection() {
  return (
    <section className={styles.recommendationsSection}>
      <h2 className={styles.sectionTitle}>Escapadas Recomendadas</h2>
      <div className={styles.recommendationsGrid}>
        {recommendations.map((item) => (
          <div key={item.id} className={styles.recommendationCard}>
            <div className={styles.cardImage}>
              <img
                src={item.img}
                alt={item.name}
                className={styles.recommendationImage}
              />
            </div>
            <h3 className={styles.recommendationTitle}>{item.name}</h3>
            <p className={styles.propertyType}>{item.type}</p>
            <div className={styles.cardFooter}>
              <span className={styles.price}>{item.price}</span>
              <span className={styles.rating}>⭐ {item.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

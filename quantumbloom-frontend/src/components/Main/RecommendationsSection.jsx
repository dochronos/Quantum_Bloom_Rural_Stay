import React from 'react';

const recommendations = [
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

const RecommendationsSection = () => {
  return (
    <section className="recommendations-section">
      <h2 className="section-title">Escapadas Recomendadas</h2>
      <div className="recommendations-grid">
        {recommendations.map((item) => (
          <div key={item.id} className="recommendation-card">
            <div className="card-image">
              <img
                className="recommendation-image"
                src={item.img}
                alt={item.name}
                // onError={(e) => { e.target.src = '/images/default.jpg'; }}
              />
            </div>
            <h3 className="recommendation-title">{item.name}</h3>
            <p className="property-type">{item.type}</p>
            <div className="card-footer">
              <span className="price">{item.price}</span>
              <span className="rating">⭐ {item.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationsSection;

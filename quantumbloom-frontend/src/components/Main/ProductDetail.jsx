import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import AvailabilityCalendar from '../AvailabilityCalendar/AvailabilityCalendar.jsx';
import SharePopup from '../SharePopup/SharePopup.jsx';
import NotificationToast from '../common/NotificationToast/NotificationToast.jsx';
import moment from 'moment';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const navigate = useNavigate();

  const closeToast = () => setToastMessage(null);

  const handleDateSelect = (date) => setSelectedDate(date);

  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', {
          state: {
            message: 'Inicia sesión para dejar una reseña',
            fromReserve: id,
          },
        });
        return;
      }

      const userId = JSON.parse(atob(token.split('.')[1])).userId;

      const hasReservationResponse = await fetch(
        `http://localhost:8080/api/reservations/user/${userId}/product/${id}/completed`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!hasReservationResponse.ok) {
        throw new Error('Error al verificar reservas');
      }

      const hasReservation = await hasReservationResponse.json();
      if (!hasReservation) {
        setToastMessage('Debes tener una reserva completada para dejar una reseña.');
        return;
      }

      const review = {
        product: { id: parseInt(id) },
        rating: userRating,
        comment: userComment,
      };

      const response = await fetch(`http://localhost:8080/api/reviews?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error al enviar la reseña: ${response.status} - ${errorData}`);
      }

      setUserRating(0);
      setUserComment('');
      await fetchReviews();
      await fetchAverageRating();
      await fetchReviewCount();

      setToastMessage('Reseña enviada correctamente');
    } catch (err) {
      console.error('Error en handleSubmitReview:', err);
      setToastMessage(err.message);
    }
  };

  const handleReserveClick = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', {
        state: {
          message: 'Para reservar, debes iniciar sesión o registrarte.',
          fromReserve: id,
        },
      });
      return;
    }

    if (!selectedDate) {
      setToastMessage('Por favor, selecciona una fecha para la reserva.');
      return;
    }

    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

      const response = await fetch(
        `http://localhost:8080/api/reservations?productId=${id}&reservationDate=${formattedDate}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      const data = await response.json();
      console.log('Reserva creada:', data);

      setToastMessage('Reserva creada con éxito');
    } catch (err) {
      console.error(err);
      setToastMessage('Hubo un error al crear la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', {
        state: {
          message: 'Debes iniciar sesión para usar favoritos.',
          fromReserve: id,
        },
      });
      return;
    }

    try {
      const endpoint = `http://localhost:8080/api/favorites/${id}`;
      const method = isFavorite ? 'DELETE' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al ${isFavorite ? 'remover' : 'agregar'} favorito`);
      }

      setIsFavorite(!isFavorite);
      setToastMessage(isFavorite ? 'Removido de favoritos' : 'Agregado a favoritos');
    } catch (err) {
      console.error(err);
      setToastMessage('Ocurrió un error al actualizar favoritos.');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/product/${id}`);
      if (!response.ok) throw new Error('Error al obtener reseñas');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/product/${id}/average`);
      if (!response.ok) throw new Error('Error al obtener promedio');
      const avg = await response.json();
      setAverageRating(avg);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchReviewCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/product/${id}/count`);
      if (!response.ok) throw new Error('Error al obtener cantidad');
      const count = await response.json();
      setReviewCount(count);
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkIfFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const isFav = await response.json();
        setIsFavorite(isFav);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkIfUserHasReservation = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const userId = JSON.parse(atob(token.split('.')[1])).userId;
      const response = await fetch(
        `http://localhost:8080/api/reservations/user/${userId}/product/${id}/completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        // Podrías usar setUserHasReservation(result) si es necesario
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', {
        state: { message: 'Debes iniciar sesión para acceder a esta página.' },
      });
    } else {
      checkIfUserHasReservation();
      fetchProduct();
      checkIfFavorite();
      fetchReviews();
      fetchAverageRating();
      fetchReviewCount();
    }
  }, [id]);

  if (loading) return <div className="loading-message">Cargando...</div>;
  if (error)
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={fetchProduct} className="styled-button">
          Reintentar
        </button>
      </div>
    );
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-detail">
      <h1 className="product-title">{product.name}</h1>

      <div className="gallery-container">
        <div className="gallery-block">
          <div className="main-image">
            {product.images[0] && (
              <img src={product.images[0]} alt={`Imagen principal de ${product.name}`} />
            )}
          </div>
          <div className="grid-images">
            {product.images.slice(1, 5).map((image, index) => (
              <div key={index} className="grid-image">
                <img src={image} alt={`Imagen ${index + 1} de ${product.name}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="view-more">
          <Link to={`/product/${product.id}/gallery`}>Ver más</Link>
        </div>
      </div>

      <div className="product-info">
        <div className="section-card">
          <div className="button-group">
            <button
              onClick={toggleFavorite}
              className={`favorite-button ${isFavorite ? 'remove' : 'add'}`}
              disabled={loading}
            >
              {isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
            </button>

            <button onClick={() => setShowSharePopup(true)} className="share-button">
              Compartir
            </button>
          </div>

          <p>
            <strong>Tipo:</strong> {product.type}
          </p>
          <p>
            <strong>Precio:</strong> {product.price}
          </p>
          <p>
            <strong>Ubicación:</strong> {product.location}
          </p>
        </div>

        <div className="section-card">
          <h2 className="section-title">Descripción</h2>
          <p>{product.description}</p>
        </div>

        <div className="section-card">
          <h2 className="section-title">Características</h2>
          <ul className="features-list">
            {product.features.map((feature) => (
              <li key={feature.id}>
                <img src={feature.icon} alt={feature.name} />
                {feature.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <h2 className="section-title">Disponibilidad</h2>
          <AvailabilityCalendar
            occupiedDates={product.occupiedDates}
            onDateSelect={handleDateSelect}
            onShowMessage={setToastMessage}
          />
        </div>

        <div className="section-card">
          <h2 className="section-title">Valoraciones</h2>
          <div className="average-rating">
            ⭐ {(averageRating || 0).toFixed(1)} ({reviewCount} reseñas)
          </div>

          <div className="review-form">
            <h3>Deja tu reseña</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                  style={{
                    color: star <= (hoverRating || userRating) ? 'gold' : 'gray',
                    cursor: 'pointer',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Escribe tu comentario..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button onClick={handleSubmitReview} className="styled-button">
              Enviar Reseña
            </button>
          </div>

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-user">{review.user.name}</span>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="review-rating">⭐ {review.rating.toFixed(1)}</div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Reserva</h2>
          <p>Seleccioná una fecha disponible para reservar este alojamiento.</p>
          <button onClick={handleReserveClick} className="reserve-button">
            Reservar
          </button>
        </div>
      </div>

      {showSharePopup && (
        <SharePopup product={product} onClose={() => setShowSharePopup(false)} />
      )}

      <NotificationToast message={toastMessage} onClose={closeToast} />
    </div>
  );
};

export default ProductDetail;

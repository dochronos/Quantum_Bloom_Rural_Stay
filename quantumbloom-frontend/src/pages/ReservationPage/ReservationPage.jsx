import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AvailabilityCalendar from '../../components/AvailabilityCalendar/AvailabilityCalendar.jsx';
import '../ReservationPage/ReservationPage.css';

const ReservePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      const data = await response.json();
      setProduct(data);
      setAvailableDates(data.occupiedDates || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.sub;
    } catch (error) {
      console.error('Token inválido', error);
      return null;
    }
  };

  const handleSubmitReservation = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Usuario no autenticado');
      return;
    }

    const isAvailable = selectedDates.every(date =>
      !availableDates.includes(date.toISOString().split('T')[0])
    );

    if (!isAvailable) {
      alert('Algunas de las fechas seleccionadas no están disponibles.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: id,
          reservationDate: selectedDates[0], // En esta versión asumimos una sola fecha
        }),
      });

      if (!response.ok) throw new Error('Error al crear la reserva');

      alert('Reserva creada exitosamente');
      navigate(`/product/${id}`);
    } catch (err) {
      console.error(err);
      alert('Error al crear la reserva');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={fetchProduct}>Reintentar</button>
      </div>
    );
  }

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="reserve-page">
      <h1>Reservar {product.name}</h1>

      <div className="calendar-section">
        <h2>Selecciona las fechas de reserva</h2>
        <AvailabilityCalendar
          occupiedDates={availableDates}
          onDateSelect={handleDateSelect}
        />
      </div>

      <div className="selected-dates">
        <h3>Fechas seleccionadas:</h3>
        {selectedDates.map((date, index) => (
          <p key={index}>{date.toLocaleDateString()}</p>
        ))}
      </div>

      <button
        onClick={handleSubmitReservation}
        disabled={selectedDates.length === 0}
        className="confirm-reservation-button"
      >
        Confirmar Reserva
      </button>
    </div>
  );
};

export default ReservePage;

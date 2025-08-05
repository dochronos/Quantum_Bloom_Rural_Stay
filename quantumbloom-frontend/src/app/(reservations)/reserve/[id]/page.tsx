'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AvailabilityCalendar from '@/components/availability-calendar/AvailabilityCalendar';
import styles from './reserve.module.css';

interface Product {
  id: number;
  name: string;
  occupiedDates: string[];
}

const ReservePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      const data = await response.json();
      setProduct(data);
      setAvailableDates(data.occupiedDates || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const getUserIdFromToken = (): string | null => {
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
          reservationDate: selectedDates[0],
        }),
      });

      if (!response.ok) throw new Error('Error al crear la reserva');

      alert('Reserva creada exitosamente');
      router.push(`/product/${id}`);
    } catch (err) {
      console.error(err);
      alert('Error al crear la reserva');
    }
  };

  if (loading) return <div className={styles.loading}>Cargando...</div>;

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <p>Error: {error}</p>
        <button onClick={fetchProduct}>Reintentar</button>
      </div>
    );
  }

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className={styles.reservePage}>
      <h1>Reservar {product.name}</h1>

      <div className={styles.calendarSection}>
        <h2>Selecciona las fechas de reserva</h2>
        <AvailabilityCalendar
          occupiedDates={availableDates}
          onDateSelect={handleDateSelect}
        />
      </div>

      <div className={styles.selectedDates}>
        <h3>Fechas seleccionadas:</h3>
        {selectedDates.map((date, index) => (
          <p key={index}>{date.toLocaleDateString()}</p>
        ))}
      </div>

      <button
        onClick={handleSubmitReservation}
        disabled={selectedDates.length === 0}
        className={styles.confirmReservationButton}
      >
        Confirmar Reserva
      </button>
    </div>
  );
};

export default ReservePage;

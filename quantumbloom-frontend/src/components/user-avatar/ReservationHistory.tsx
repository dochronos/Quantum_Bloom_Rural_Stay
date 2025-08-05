'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './ReservationHistory.module.css';

interface Reservation {
  id: number;
  spaceName: string;
  date: string;
  status: string;
}

const ReservationHistory: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró el token. Inicia sesión nuevamente.');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      const response = await fetch(
        `http://localhost:8080/api/users/reservations?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener el historial de reservas.');
      }

      const data: Reservation[] = await response.json();
      setReservations(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error desconocido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <div className={styles.message}>Cargando tu historial de reservas...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.historyPage}>
      <h1>Historial de Reservas</h1>

      {reservations.length === 0 ? (
        <p className={styles.empty}>Aún no realizaste ninguna reserva.</p>
      ) : (
        <div className={styles.reservationList}>
          {reservations.map((reservation) => (
            <div key={reservation.id} className={styles.reservationItem}>
              <h2>{reservation.spaceName}</h2>
              <p><strong>Fecha:</strong> {reservation.date}</p>
              <p><strong>Estado:</strong> {reservation.status}</p>
              <Link href={`/product/${reservation.id}`}>
                <button className={styles.detailsButton}>Ver Detalles</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationHistory;

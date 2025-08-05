'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './user-dashboard.module.css';

const UserDashboard: React.FC = () => {
  const router = useRouter();

  const handleFavoritesClick = () => {
    router.push('/favorites');
  };

  const handleReservationsClick = () => {
    router.push('/reservations');
  };

  return (
    <div className={styles.userDashboard}>
      <h1>Mi Cuenta</h1>

      <div className={styles.dashboardOptions}>
        <button
          onClick={handleFavoritesClick}
          className={styles.dashboardButton}
          aria-label="Ver favoritos"
        >
          Mis Favoritos
        </button>

        <button
          onClick={handleReservationsClick}
          className={styles.dashboardButton}
          aria-label="Ver historial de reservas"
        >
          Historial de Reservas
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;

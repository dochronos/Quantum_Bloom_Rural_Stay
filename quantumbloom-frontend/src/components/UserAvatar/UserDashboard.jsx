import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleReservationsClick = () => {
    navigate('/reservations');
  };

  return (
    <div className="user-dashboard">
      <h1>Mi Cuenta</h1>

      <div className="dashboard-options">
        <button
          onClick={handleFavoritesClick}
          className="dashboard-button"
          aria-label="Ver favoritos"
        >
          Mis Favoritos
        </button>

        <button
          onClick={handleReservationsClick}
          className="dashboard-button"
          aria-label="Ver historial de reservas"
        >
          Historial de Reservas
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;

import React from 'react';
import './AdminPanel.css'; 
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  // Función para detectar si el usuario está en un dispositivo móvil
  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  // Si es un dispositivo móvil, mostrar un mensaje
  if (isMobile()) {
    return (
      <div className="mobile-message">
        <h2>Acceso no disponible</h2>
        <p>El panel de administración no está disponible en dispositivos móviles.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Panel de Gestión - Quantum Bloom</h1>
      <nav className="admin-menu">
        <ul>
          <li>
            <Link to="/admin/add-product">Registrar Alojamiento</Link>
          </li>
          <li>
            <Link to="/admin/product-list">Listado de Alojamientos</Link> 
          </li>
          <li>
            <Link to="/admin/manage-users">Gestión de Usuarios</Link>
          </li>
          <li>
            <Link to="/admin/manage-features">Características Disponibles</Link> 
          </li>
          <li>
            <Link to="/admin/manage-categories">Categorías de Alojamiento</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;

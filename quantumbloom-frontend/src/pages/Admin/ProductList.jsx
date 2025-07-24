import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [stays, setStays] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStays();
  }, []);

  const fetchStays = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/stays'); // Asegurate que coincida con tu endpoint real
      const data = await response.json();
      setStays(data);
    } catch (error) {
      console.error('Error al obtener alojamientos:', error);
    }
  };

  const handleDeleteStay = async (stayId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este alojamiento?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/stays/${stayId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setStays(stays.filter((stay) => stay.id !== stayId));
        alert('Alojamiento eliminado correctamente');
      } else {
        alert('Error al eliminar el alojamiento');
      }
    } catch (error) {
      console.error('Error al eliminar el alojamiento:', error);
      alert('Error al eliminar el alojamiento');
    }
  };

  return (
    <div className="product-list-container">
      <h1>Lista de Alojamientos</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stays.map((stay) => (
            <tr key={stay.id}>
              <td>{stay.id}</td>
              <td>{stay.name}</td>
              <td>{stay.location}</td>
              <td>
                <Link to={`/admin/edit-stay/${stay.id}`} className="action-button">
                  Editar
                </Link>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDeleteStay(stay.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

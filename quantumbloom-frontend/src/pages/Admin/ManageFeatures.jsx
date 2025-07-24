import React, { useState, useEffect } from 'react';
import './Admin.css';

const ManageFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: '', icon: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/features', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al obtener características');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error('Error al obtener características:', error);
    }
  };

  const handleAddFeature = async () => {
    // Validación simple
    if (!newFeature.name.trim() || !newFeature.icon.trim()) {
      alert('Por favor completá ambos campos antes de agregar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newFeature)
      });

      if (!response.ok) throw new Error('Error al agregar característica');

      fetchFeatures();
      setNewFeature({ name: '', icon: '' });
    } catch (error) {
      console.error('Error al agregar característica:', error);
      alert('Ocurrió un error al intentar agregar la característica.');
    }
  };

  const handleDeleteFeature = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que querés eliminar esta característica?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/features/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al eliminar característica');

      fetchFeatures();
    } catch (error) {
      console.error('Error al eliminar característica:', error);
      alert('Ocurrió un error al intentar eliminar la característica.');
    }
  };

  return (
    <div className="manage-features">
      <h2>Administrar Características</h2>

      <div className="manage-feature-container">
        <input
          type="text"
          placeholder="Nombre de la característica"
          value={newFeature.name}
          onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Icono (URL de imagen)"
          value={newFeature.icon}
          onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
        />
        <button onClick={handleAddFeature}>Agregar</button>
      </div>

      <ul className="feature-list">
        {features.map((feature) => (
          <li key={feature.id}>
            {feature.name} -&nbsp;
            <img src={feature.icon} alt={`Ícono de ${feature.name}`} />
            <button
              className="feature-button"
              onClick={() => handleDeleteFeature(feature.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFeatures;

'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { UserContext } from '@/context/UserContext';
import '@/app/styles/Admin.css';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allFeatures, setAllFeatures] = useState<any[]>([]);

  const { user } = useContext(UserContext);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => setAllCategories(data))
      .catch(console.error);

    fetch(`${API_URL}/features`)
      .then(res => res.json())
      .then(data => setAllFeatures(data))
      .catch(console.error);
  }, []);

  const handleFeatureToggle = (featureId: string) => {
    setFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.token) {
      alert('Debes iniciar sesión para realizar esta acción.');
      return;
    }

    const productData = {
      name,
      description,
      category: { id: categoryId },
      features: features.map(id => ({ id })),
      images: images.map(url => ({ url })),
      address,
      latitude: location.latitude,
      longitude: location.longitude,
      unavailableDates
    };

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Producto creado correctamente');
        router.push('/admin'); // o donde desees redirigir
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la solicitud');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
        <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required />
        
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Seleccionar categoría</option>
          {allCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <div className="features-list">
          {allFeatures.map(feature => (
            <label key={feature.id}>
              <input
                type="checkbox"
                checked={features.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
              />
              {feature.name}
            </label>
          ))}
        </div>

        <div className="images-input">
          {images.map((url, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Imagen ${i + 1}`}
              value={url}
              onChange={e => handleImageChange(i, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddImage}>Agregar Imagen</button>
        </div>

        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <input
          type="number"
          placeholder="Latitud"
          value={location.latitude}
          onChange={e => setLocation({ ...location, latitude: parseFloat(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Longitud"
          value={location.longitude}
          onChange={e => setLocation({ ...location, longitude: parseFloat(e.target.value) })}
        />

        <textarea
          placeholder="Fechas no disponibles (formato: YYYY-MM-DD, separadas por coma)"
          value={unavailableDates.join(',')}
          onChange={e => setUnavailableDates(e.target.value.split(',').map(date => date.trim()))}
        />

        <button type="submit">Crear producto</button>
      </form>
    </div>
  );
};

export default AddProduct;

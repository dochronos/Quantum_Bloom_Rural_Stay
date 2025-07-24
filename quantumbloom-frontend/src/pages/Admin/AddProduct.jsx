import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import LocationAutocomplete from '../../components/LocationApi/LocationAutocomplete.jsx';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    images: [],
    features: [],
    location: '',
    unavailableDates: [],
  });

  const [allFeatures, setAllFeatures] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/features');
      const data = await response.json();
      setAllFeatures(data);
    } catch (err) {
      console.error('Error al cargar características:', err);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formDataUpload = new FormData();
    files.forEach((file) => formDataUpload.append('files', file));

    try {
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataUpload
      });

      const uploadedUrls = await response.json();

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
      setError('No se pudieron subir las imágenes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      featureIds: formData.features,
    };

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al guardar el producto');
      }

      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Registrar nuevo alojamiento o experiencia</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del producto:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría:</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="Hospedaje">Hospedaje</option>
            <option value="Experiencia Rural">Experiencia Rural</option>
            <option value="Caminata Guiada">Caminata Guiada</option>
            <option value="Taller">Taller</option>
            <option value="Botánica">Botánica</option>
          </select>
        </div>

        <div className="form-group">
          <label>Precio (por noche o experiencia):</label>
          <input
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Ubicación:</label>
          <LocationAutocomplete
            onPlaceSelected={(address) => setFormData({ ...formData, location: address })}
          />
        </div>

        <div className="form-group">
          <label>Imágenes:</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
            id="file-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            Seleccionar imágenes
          </label>
          <div className="image-preview">
            {formData.images.map((img, index) => (
              <img key={index} src={img} alt={`Imagen ${index}`} />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Características:</label>
          <select
            multiple
            value={formData.features}
            onChange={(e) =>
              setFormData({
                ...formData,
                features: Array.from(e.target.selectedOptions, (option) => option.value)
              })
            }
          >
            {allFeatures.map((feature) => (
              <option key={feature.id} value={feature.id}>
                {feature.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fechas no disponibles:</label>
          <input
            type="date"
            onChange={(e) => {
              const date = e.target.value;
              if (date && !formData.unavailableDates.includes(date)) {
                setFormData((prev) => ({
                  ...prev,
                  unavailableDates: [...prev.unavailableDates, date]
                }));
              }
            }}
          />
          <div className="selected-dates">
            {formData.unavailableDates.map((date, index) => (
              <div key={index} className="date-tag">
                {date}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      unavailableDates: prev.unavailableDates.filter((d, i) => i !== index)
                    }));
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
};

export default AddProduct;

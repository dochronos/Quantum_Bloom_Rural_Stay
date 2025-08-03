'use client';

import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const EditProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  // Simular carga de productos (esto debería venir de una API real)
  useEffect(() => {
    const fakeProducts: Product[] = [
      {
        id: 1,
        title: 'Cabaña Eco Natural',
        description: 'Cabaña rodeada de árboles y río cercano.',
        price: 15000,
        image: '/images/quantumbloom/cabana1.jpg'
      },
      {
        id: 2,
        title: 'Refugio Serrano',
        description: 'Ubicación privilegiada en las sierras.',
        price: 18000,
        image: '/images/quantumbloom/refugio1.jpg'
      }
    ];
    setProducts(fakeProducts);
  }, []);

  // Cargar datos al seleccionar un producto
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setSelectedProductId(id);
    const selected = products.find(p => p.id === id);
    if (selected) setFormData(selected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProductId !== null) {
      console.log('Producto actualizado:', formData);
      // Aquí iría la llamada a la API real
      alert('Producto actualizado con éxito.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar Alojamiento</h2>

      <label htmlFor="productSelect">Selecciona un alojamiento:</label>
      <select id="productSelect" onChange={handleSelectChange} value={selectedProductId ?? ''}>
        <option value="">-- Selecciona --</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.title}
          </option>
        ))}
      </select>

      {selectedProductId && (
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formData.title ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Descripción:
            <textarea
              name="description"
              value={formData.description ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Precio:
            <input
              type="number"
              name="price"
              value={formData.price ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Imagen (URL):
            <input
              type="text"
              name="image"
              value={formData.image ?? ''}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Actualizar</button>
        </form>
      )}
    </div>
  );
};

export default EditProductPage;

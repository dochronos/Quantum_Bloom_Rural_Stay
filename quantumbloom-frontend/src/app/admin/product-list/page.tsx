'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './productList.module.css';

interface Stay {
  id: number;
  name: string;
  location: string;
}

const ProductListPage = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    fetchStays(token);
  }, []);

  const fetchStays = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/stays', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los alojamientos');
      }

      const data = await response.json();
      setStays(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error desconocido');
    }
  };

  const handleDeleteStay = async (stayId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este alojamiento?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No autorizado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/stays/${stayId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStays(prev => prev.filter(stay => stay.id !== stayId));
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
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Alojamientos</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table className={styles.table}>
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
                <Link
                  href={`/admin/edit-stay/${stay.id}`}
                  className={styles.actionButton}
                >
                  Editar
                </Link>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
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

export default ProductListPage;

'use client';

import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';

const ProfilePage = () => {
  const [tokenData, setTokenData] = useState<{ name?: string; sub?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No has iniciado sesión.');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setTokenData(payload);
      } catch (err) {
        console.error('Error al decodificar el token:', err);
        setError('Error al leer los datos del perfil.');
      }
    }
  }, []);

  if (error) {
    return (
      <div className={styles['profile-container']}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!tokenData) {
    return (
      <div className={styles['profile-container']}>
        <h2>Cargando perfil...</h2>
      </div>
    );
  }

  const name = tokenData.name || 'Usuario';
  const email = tokenData.sub || 'Sin email';

  return (
    <div className={styles['profile-container']}>
      <h1>Perfil del Usuario</h1>
      <div className={styles['profile-info']}>
        <p>
          <strong>Nombre:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;

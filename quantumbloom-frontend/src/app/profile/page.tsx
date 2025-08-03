'use client';

import React from 'react';
import styles from './profile.module.css';

const ProfilePage = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return (
      <div className={styles['profile-container']}>
        <h2>No has iniciado sesión.</h2>
      </div>
    );
  }

  let decoded: { name?: string; sub?: string } = {};
  try {
    decoded = JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return (
      <div className={styles['profile-container']}>
        <h2>Error al leer los datos del perfil.</h2>
      </div>
    );
  }

  const name = decoded.name || 'Usuario';
  const email = decoded.sub || 'Sin email';

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

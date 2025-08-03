'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css';
import { jwtDecode } from 'jwt-decode';

interface LoginProps {}

const LoginPage = ({}: LoginProps) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const reservationMessage = searchParams.get('message') || '';
  const fromReserve = searchParams.get('fromReserve');

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();
      const token = data.token;

      if (!token) {
        throw new Error('No se recibió un token válido');
      }

      const decoded: any = jwtDecode(token);
      const user = {
        token,
        email: decoded.sub,
        name: decoded.name,
        role: decoded.roles || [],
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (fromReserve) {
        router.push(`/reserve/${fromReserve}`);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      setServerError('Email o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Iniciar Sesión</h2>

      {reservationMessage && (
        <p className={styles.reservationMessage}>{reservationMessage}</p>
      )}

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        {serverError && <p className={styles.error}>{serverError}</p>}

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;

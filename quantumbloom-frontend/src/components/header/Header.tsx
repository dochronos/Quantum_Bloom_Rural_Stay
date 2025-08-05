'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './header.module.css';
import UserAvatar from '../user-avatar/UserAvatar';

interface User {
  name?: string;
  roles?: string[] | string;
}

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const hasRole = (roleName: string): boolean => {
    if (!user || !user.roles) return false;
    return Array.isArray(user.roles)
      ? user.roles.includes(roleName)
      : user.roles === roleName;
  };

  return (
    <header className={styles['main-header']}>
      <div className={styles['header-left']}>
        <h1 className={styles['site-title']} onClick={() => router.push('/')}>
          Quantum Bloom Rural Stay
        </h1>
        <span className={styles['slogan']}>Refugios rurales para tu descanso ideal</span>
      </div>

      {user ? (
        <div className={styles['user-info']}>
          <UserAvatar name={user.name || 'Usuario'} />
          <span>{user.name}</span>
          {hasRole('ADMIN') && (
            <button
              className={styles['auth-button']}
              onClick={() => router.push('/admin')}
            >
              Administrar
            </button>
          )}
          <button className={styles['auth-button']} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className={styles['header-right']}>
          <button
            className={styles['auth-button']}
            onClick={() => router.push('/register')}
          >
            Crear cuenta
          </button>
          <button
            className={styles['auth-button']}
            onClick={() => router.push('/login')}
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

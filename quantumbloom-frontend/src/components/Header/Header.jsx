'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './Header.css';
import UserAvatar from '../UserAvatar/UserAvatar';

const Header = ({ user, setUser }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push('/');
  };

  const hasRole = (roleName) => {
    if (!user || !user.roles) return false;
    return Array.isArray(user.roles)
      ? user.roles.includes(roleName)
      : user.roles === roleName;
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="site-title" onClick={() => router.push('/')}>
          Quantum Bloom Rural Stay
        </h1>
        <span className="slogan">Refugios rurales para tu descanso ideal</span>
      </div>

      {user ? (
        <div className="user-info">
          <UserAvatar name={user?.name || "Usuario"} />
          <span>{user?.name}</span>

          {hasRole("ADMIN") && (
            <button className="auth-button" onClick={() => router.push('/admin')}>Administrar</button>
          )}

          <button className="auth-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div className="header-right">
          <button className="auth-button" onClick={() => router.push('/register')}>Crear cuenta</button>
          <button className="auth-button" onClick={() => router.push('/login')}>Iniciar Sesión</button>
        </div>
      )}
    </header>
  );
};

export default Header;

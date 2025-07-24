import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';

export const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };

  const hasRole = (roleName) => {
    if (!user || !user.roles) return false;
    if (Array.isArray(user.roles)) {
      return user.roles.includes(roleName);
    }
    if (typeof user.roles === 'string') {
      return user.roles === roleName;
    }
    return false;
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <h1 className="site-title">Quantum Bloom Rural Stay</h1>
          <span className="slogan">Refugios rurales para tu descanso ideal</span>
        </Link>
      </div>

      {user ? (
        <div className="user-info">
          <UserAvatar name={user?.name || "Usuario"} />
          <span>{user?.name}</span>

          {hasRole("ADMIN") && (
            <Link to="/admin" className="auth-button">Administrar</Link>
          )}

          <button className="auth-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div className="header-right">
          <button className="auth-button" onClick={() => navigate("/register")}>Crear cuenta</button>
          <Link className="auth-button" to="/login">Iniciar Sesión</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

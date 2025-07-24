import React from 'react';
import './UserAvatar.css';
import { useNavigate } from 'react-router-dom';

const UserAvatar = ({ name = "Usuario" }) => {
  const navigate = useNavigate();

  const initials = name
    .trim()
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  const handleClick = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className="user-avatar" onClick={handleClick} title={`Perfil de ${name}`}>
      <span>{initials}</span>
    </div>
  );
};

export default UserAvatar;

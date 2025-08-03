'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './UserAvatar.css';

const UserAvatar = ({ name = "Usuario" }) => {
  const router = useRouter();

  const initials = name
    .trim()
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  const handleClick = () => {
    router.push('/user-dashboard');
  };

  return (
    <div className="user-avatar" onClick={handleClick} title={`Perfil de ${name}`}>
      <span>{initials}</span>
    </div>
  );
};

export default UserAvatar;

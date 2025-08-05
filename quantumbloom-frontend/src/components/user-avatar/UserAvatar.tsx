'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  name?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name = "Usuario" }) => {
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
    <div
      className={styles.userAvatar}
      onClick={handleClick}
      title={`Perfil de ${name}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <span>{initials}</span>
    </div>
  );
};

export default UserAvatar;

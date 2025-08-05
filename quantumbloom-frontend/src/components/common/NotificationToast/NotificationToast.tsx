'use client';
import React, { useEffect } from 'react';
import styles from './notification-toast.module.css';

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastMessage}>
        {message}
      </div>
    </div>
  );
};

export default NotificationToast;

import React, { useEffect } from 'react';
import './NotificationToast.css';

const NotificationToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-message">
        {message}
      </div>
    </div>
  );
};

export default NotificationToast;

import React from 'react';
import './WhatsAppButton.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WhatsAppButton = () => {
  const phoneNumber = '54123456890';
  const message = 'Hola, estoy buscando un lugar tranquilo para descansar. ¿Me podrías ayudar?';

  const handleClick = () => {
    if (!phoneNumber || !message) {
      toast.error('Número o mensaje no configurado correctamente.');
      return;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    toast.success('Redirigiendo a WhatsApp...');
  };

  return (
    <button className="whatsapp-button" onClick={handleClick} aria-label="Contacto por WhatsApp">
      <img 
        src="https://img.icons8.com/?size=100&id=aUugRyDZVcWE&format=png&color=000000" 
        alt="WhatsApp" 
      />
    </button>
  );
};

export default WhatsAppButton;

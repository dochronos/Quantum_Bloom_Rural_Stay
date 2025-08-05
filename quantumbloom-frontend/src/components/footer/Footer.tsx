'use client';

import React from 'react';
import './footer.module.css';
import WhatsAppButton from '../whatsapp-button/WhatsAppButton';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre Quantum Bloom</h3>
          <p>Ofrecemos alojamientos rurales únicos para escapadas relajantes. Encontrá tu refugio natural ideal cerca de la ciudad.</p>
        </div>

        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/propiedades">Propiedades</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/terminos">Términos y Condiciones</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: contacto@quantumbloom.com</p>
          <p>Teléfono: +54 9 11 2345 6789</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Quantum Bloom Rural Stay. Todos los derechos reservados.</p>
      </div>

      <WhatsAppButton />
    </footer>
  );
};

export default Footer;

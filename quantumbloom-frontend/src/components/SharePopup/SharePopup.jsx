import React, { useState } from "react";
import "./SharePopup.css";

const SharePopup = ({ product, onClose }) => {
  const [customMessage, setCustomMessage] = useState("");

  const handleShare = (socialMedia) => {
    const productUrl = window.location.href;
    const message = `${customMessage || "Mirá esta cancha:"} ${productUrl}`;

    switch (socialMedia) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "instagram":
        alert("Para compartir en Instagram, copia el enlace y pégalo en la app.");
        break;
      default:
        break;
    }
  };

  return (
    <div className="share-popup-overlay" role="dialog" aria-modal="true" aria-label="Ventana emergente de compartir">
      <div className="share-popup">
        <h2 className="share-title">Compartir cancha</h2>

        <div className="share-content">
          <img
            src={product.images[0]}
            alt={`Imagen de ${product.name}`}
            className="share-image"
          />

          <p className="share-description">{product.description}</p>

          <input
            type="text"
            placeholder="Mensaje personalizado..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="share-message-input"
            aria-label="Mensaje personalizado"
          />
        </div>

        <div className="share-buttons">
          <button
            onClick={() => handleShare("facebook")}
            className="share-btn facebook"
          >
            Facebook
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="share-btn twitter"
          >
            Twitter
          </button>
          <button
            onClick={() => handleShare("instagram")}
            className="share-btn instagram"
          >
            Instagram
          </button>
        </div>

        <button onClick={onClose} className="close-button" aria-label="Cerrar ventana de compartir">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SharePopup;

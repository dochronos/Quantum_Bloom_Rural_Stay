import React from "react";
import "./Profile.css";

const Profile = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="profile-container">
        <h2>No has iniciado sesión.</h2>
      </div>
    );
  }

  // Decodificar el token para extraer info del usuario
  const decoded = JSON.parse(atob(token.split('.')[1]));
  const name = decoded.name || "Usuario";
  const email = decoded.sub || "Sin email";

  return (
    <div className="profile-container">
      <h1>Perfil del Usuario</h1>
      <div className="profile-info">
        <p><strong>Nombre:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default Profile;

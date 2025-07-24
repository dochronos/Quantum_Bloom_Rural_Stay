import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FavoritePages.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró el token. Inicia sesión nuevamente.");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      const response = await fetch(
        `http://localhost:8080/api/users/favorites?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las canchas favoritas");
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <div className="loading-message">Cargando tus favoritas...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="favorites-page">
      <h1>Mis Espacios Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="empty-message">Aún no agregaste ningún espacio a tus favoritos.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <h2>{favorite.name}</h2>
              <p>{favorite.description}</p>
              <p><strong>Precio:</strong> {favorite.price}</p>
              <button
                className="details-button"
                onClick={() => navigate(`/product/${favorite.id}`)}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FavoritePages.module.css";

interface FavoriteItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
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
        throw new Error("Error al obtener las canchas favoritas.");
      }

      const data: FavoriteItem[] = await response.json();
      setFavorites(data);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <div className={styles.emptyMessage}>Cargando tus favoritas...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.favoritesTitle}>Mis Espacios Favoritos</h1>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>Aún no agregaste ningún espacio a tus favoritos.</p>
      ) : (
        <div className={styles.favoritesList}>
          {favorites.map((favorite) => (
            <div key={favorite.id} className={styles.favoriteCard}>
              <h2>{favorite.name}</h2>
              <p>{favorite.description}</p>
              <p><strong>Precio:</strong> ${favorite.price}</p>
              <button onClick={() => navigate(`/product/${favorite.id}`)}>
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

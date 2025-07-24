package com.quantumbloom.backend.repository;

import com.quantumbloom.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Obtener todas las reseñas de un producto
    List<Review> findByProductId(Long productId);

    // Obtener la puntuación media de un producto
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double findAverageRatingByProductId(@Param("productId") Long productId);

    // Contar el número de reseñas de un producto
    Long countByProductId(Long productId);

    // Verificar si ya existe una reseña del usuario para ese producto
    boolean existsByUserIdAndProductId(Long userId, Long productId);
}

package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.model.Review;
import com.quantumbloom.backend.model.User;
import com.quantumbloom.backend.service.ReservationService;
import com.quantumbloom.backend.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReservationService reservationService;

    public ReviewController(ReviewService reviewService, ReservationService reservationService) {
        this.reviewService = reviewService;
        this.reservationService = reservationService;
    }

    // Obtener todas las reseñas de un producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    // Obtener la puntuación media de un producto
    @GetMapping("/product/{productId}/average-rating")
    public ResponseEntity<Double> getAverageRatingByProductId(@PathVariable Long productId) {
        Double averageRating = reviewService.getAverageRatingByProductId(productId);
        return ResponseEntity.ok(averageRating != null ? averageRating : 0.0);
    }

    // Obtener cantidad de reseñas por producto
    @GetMapping("/product/{productId}/review-count")
    public ResponseEntity<Long> getReviewCountByProductId(@PathVariable Long productId) {
        Long count = reviewService.getReviewCountByProductId(productId);
        return ResponseEntity.ok(count);
    }

    // Crear reseña
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review, @RequestParam Long userId) {
        if (review.getProduct() == null || review.getProduct().getId() == null) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "El producto es obligatorio"));
        }

        boolean hasCompleted = reservationService.hasUserCompletedReservation(userId, review.getProduct().getId());
        if (!hasCompleted) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("error", "No se puede dejar una reseña sin una reserva completada"));
        }

        User user = new User();
        user.setId(userId);
        review.setUser(user);

        Review newReview = reviewService.createReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReview);
    }
}

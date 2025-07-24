package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.config.JwtTokenProvider;
import com.quantumbloom.backend.model.Reservation;
import com.quantumbloom.backend.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ReservationController {

    private final ReservationService reservationService;
    private final JwtTokenProvider jwtTokenProvider;

    public ReservationController(ReservationService reservationService, JwtTokenProvider jwtTokenProvider) {
        this.reservationService = reservationService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // Crear una nueva reserva
    @PostMapping
    public ResponseEntity<?> createReservation(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam Long productId,
            @RequestParam LocalDate reservationDate) {

        try {
            String token = authorizationHeader.replace("Bearer ", "");
            Long userId = jwtTokenProvider.getUserIdFromToken(token);

            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("error", "Token inválido o expirado"));
            }

            Reservation reservation = reservationService.createReservation(userId, productId, reservationDate);
            return ResponseEntity.status(HttpStatus.CREATED).body(reservation);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("error", "Error al crear la reserva"));
        }
    }

    // Marcar una reserva como completada
    @PutMapping("/{reservationId}/complete")
    public ResponseEntity<?> completeReservation(@PathVariable Long reservationId) {
        try {
            reservationService.completeReservation(reservationId);
            return ResponseEntity.ok(Collections.singletonMap("message", "Reserva completada correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "No se pudo completar la reserva"));
        }
    }

    // Obtener todas las reservas de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.getReservationsByUser(userId));
    }

    // Obtener todas las reservas de un producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Reservation>> getReservationsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reservationService.getReservationsByProduct(productId));
    }

    // Verificar si un usuario tiene una reserva completada para un producto
    @GetMapping("/user/{userId}/product/{productId}/completed")
    public ResponseEntity<Boolean> hasUserCompletedReservation(
            @PathVariable Long userId,
            @PathVariable Long productId) {
        boolean hasCompleted = reservationService.hasUserCompletedReservation(userId, productId);
        return ResponseEntity.ok(hasCompleted);
    }

    // Eliminar una reserva
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Reserva eliminada correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}

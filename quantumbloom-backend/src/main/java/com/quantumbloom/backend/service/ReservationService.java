package com.quantumbloom.backend.service;

import com.quantumbloom.backend.model.Reservation;
import com.quantumbloom.backend.model.User;
import com.quantumbloom.backend.model.Product;
import com.quantumbloom.backend.repository.ReservationRepository;
import com.quantumbloom.backend.repository.UserRepository;
import com.quantumbloom.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EmailService emailService;

    // Crear una nueva reserva
    @Transactional
    public Reservation createReservation(Long userId, Long productId, LocalDate reservationDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + productId));

        User provider = product.getUser();

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setProduct(product);
        reservation.setReservationDate(reservationDate);
        reservation.setCompleted(false);

        reservationRepository.save(reservation);

        // Enviar correo de confirmación al usuario
        String subject = "Confirmación de reserva";
        String body = "Hola " + user.getName() + ",\n\n" +
                "Tu reserva para " + product.getName() + " ha sido confirmada.\n" +
                "Fecha de reserva: " + reservationDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\n" +
                "Ubicación: " + product.getLocation() + "\n" +
                "Contacto del proveedor:\n" +
                " - Correo: " + provider.getEmail() + "\n\n" +
                "Gracias por usar nuestro servicio.";

        emailService.sendReservationConfirmation(user.getEmail(), subject, body);

        return reservation;
    }

    @Transactional
    public void completeReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Reserva no encontrada con ID: " + reservationId));
        reservation.setCompleted(true);
        reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<Reservation> getReservationsByProduct(Long productId) {
        return reservationRepository.findByProductId(productId);
    }

    public boolean hasUserCompletedReservation(Long userId, Long productId) {
        return reservationRepository.existsByUserIdAndProductIdAndIsCompletedTrue(userId, productId);
    }

    @Transactional
    public void markPastReservationsAsCompleted() {
        LocalDate today = LocalDate.now();
        List<Reservation> pastReservations = reservationRepository.findByReservationDateBeforeAndIsCompletedFalse(today);

        for (Reservation reservation : pastReservations) {
            reservation.setCompleted(true);
            reservationRepository.save(reservation);
        }
    }

    @Transactional
    public void deleteReservation(Long reservationId) {
        if (!reservationRepository.existsById(reservationId)) {
            throw new ReservationNotFoundException("Reserva no encontrada con ID: " + reservationId);
        }
        reservationRepository.deleteById(reservationId);
    }

    // Excepciones personalizadas para claridad y consistencia
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class ProductNotFoundException extends RuntimeException {
        public ProductNotFoundException(String message) {
            super(message);
        }
    }

    public static class ReservationNotFoundException extends RuntimeException {
        public ReservationNotFoundException(String message) {
            super(message);
        }
    }
}

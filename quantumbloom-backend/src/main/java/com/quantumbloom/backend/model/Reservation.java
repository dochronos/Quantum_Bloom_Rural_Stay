package com.quantumbloom.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Usuario que realiza la reserva

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // Alojamiento reservado

    private LocalDate reservationDate; // Fecha de la reserva

    private boolean isCompleted; // Indica si la reserva ha sido completada

    // === Getters y Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    // === toString() ===

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", user=" + user +
                ", product=" + product +
                ", reservationDate=" + reservationDate +
                ", isCompleted=" + isCompleted +
                '}';
    }
}

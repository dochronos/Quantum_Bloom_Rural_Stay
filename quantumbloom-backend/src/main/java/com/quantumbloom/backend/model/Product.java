package com.quantumbloom.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String price;
    private Double rating;
    private String description;
    private String location; // Ubicación de la cancha

    @ElementCollection
    private List<String> images = new ArrayList<>();

    @ElementCollection
    private List<LocalDate> occupiedDates = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToMany
    @JoinTable(
        name = "product_features",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Feature> features = new ArrayList<>();

    // === Getters & Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images != null ? images : new ArrayList<>();
    }

    public List<LocalDate> getOccupiedDates() {
        return occupiedDates;
    }

    public void setOccupiedDates(List<LocalDate> occupiedDates) {
        this.occupiedDates = occupiedDates != null ? occupiedDates : new ArrayList<>();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features != null ? features : new ArrayList<>();
    }

    // === toString() (sin relaciones para evitar loops) ===

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", price='" + price + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", images=" + images +
                ", occupiedDates=" + occupiedDates +
                '}';
    }
}

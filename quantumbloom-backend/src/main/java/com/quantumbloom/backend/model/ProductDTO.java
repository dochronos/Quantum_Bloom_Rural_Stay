package com.quantumbloom.backend.model;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.List;

public class ProductDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "El tipo es obligatorio")
    private String type;

    @NotNull(message = "El precio es obligatorio")
    private Double price;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private Double rating;

    @NotEmpty(message = "Debe subir al menos una imagen")
    private List<String> images;

    private String description;

    private List<Long> featureIds;

    private List<LocalDate> occupiedDates;

    @NotBlank(message = "La ubicación es obligatoria")
    private String location;

    // === Getters y Setters ===

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Long> getFeatureIds() {
        return featureIds;
    }

    public void setFeatureIds(List<Long> featureIds) {
        this.featureIds = featureIds;
    }

    public List<LocalDate> getOccupiedDates() {
        return occupiedDates;
    }

    public void setOccupiedDates(List<LocalDate> occupiedDates) {
        this.occupiedDates = occupiedDates;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // === toString() ===

    @Override
    public String toString() {
        return "ProductDTO{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", rating=" + rating +
                ", images=" + images +
                ", description='" + description + '\'' +
                ", featureIds=" + featureIds +
                ", occupiedDates=" + occupiedDates +
                ", location='" + location + '\'' +
                '}';
    }
}

package com.quantumbloom.backend.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;

public class UserDTO {

    @NotNull(message = "El email no puede ser nulo")
    @NotEmpty(message = "El email no puede estar vacío")
    private String email;

    @NotNull(message = "La contraseña no puede ser nula")
    @NotEmpty(message = "La contraseña no puede estar vacía")
    private String password;

    @NotNull(message = "El nombre no puede ser nulo")
    @NotEmpty(message = "El nombre no puede estar vacío")
    private String name;

    @NotNull(message = "El rol no puede ser nulo")
    private Role role;

    // Getters y Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.config.JwtTokenProvider;
import com.quantumbloom.backend.model.LoginRequest;
import com.quantumbloom.backend.model.Product;
import com.quantumbloom.backend.model.User;
import com.quantumbloom.backend.model.UserDTO;
import com.quantumbloom.backend.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        logger.info("UserController cargado correctamente");
    }

    // Obtener todos los usuarios (opcional para administración)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDto) {
        User newUser = userService.registerUser(userDto);
        String token = jwtTokenProvider.generateToken(
                newUser.getEmail(),
                newUser.getId(),
                List.of(new SimpleGrantedAuthority(newUser.getRole().name()))
        );
        return ResponseEntity.ok(new JwtTokenProvider.JwtResponse(token));
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new JwtTokenProvider.JwtResponse(token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    // Agregar producto a favoritos
    @PostMapping("/favorites/add")
    public ResponseEntity<?> addFavorite(
            @RequestHeader(value = "Authorization") String authHeader,
            @RequestParam Long userId,
            @RequestParam Long productId) {

        try {
            validateTokenAndUser(authHeader, userId);
            userService.addFavorite(userId, productId);
            return ResponseEntity.ok(Map.of("message", "Producto añadido a favoritos correctamente"));
        } catch (RuntimeException e) {
            logger.error("Error al añadir favorito: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    // Eliminar producto de favoritos
    @DeleteMapping("/favorites/remove")
    public ResponseEntity<?> removeFavorite(
            @RequestHeader(value = "Authorization") String authHeader,
            @RequestParam Long userId,
            @RequestParam Long productId) {

        try {
            validateTokenAndUser(authHeader, userId);
            userService.removeFavorite(userId, productId);
            return ResponseEntity.ok(Map.of("message", "Producto eliminado de favoritos correctamente"));
        } catch (RuntimeException e) {
            logger.error("Error al eliminar favorito: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    // Obtener favoritos de un usuario
    @GetMapping("/favorites")
    public ResponseEntity<?> getFavorites(
            @RequestHeader(value = "Authorization") String authHeader,
            @RequestParam Long userId) {

        try {
            validateTokenAndUser(authHeader, userId);
            List<Product> favorites = userService.getFavorites(userId);
            return ResponseEntity.ok(favorites);
        } catch (RuntimeException e) {
            logger.error("Error al obtener favoritos: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    // Validación JWT + coincidencia de userId
    private void validateTokenAndUser(String authHeader, Long userId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token no proporcionado");
        }

        String token = authHeader.substring(7);
        if (!jwtTokenProvider.validateToken(token)) {
            throw new RuntimeException("Token inválido");
        }

        Long tokenUserId = jwtTokenProvider.getUserIdFromToken(token);
        if (!userId.equals(tokenUserId)) {
            throw new RuntimeException("Token no corresponde al usuario autenticado");
        }
    }
}

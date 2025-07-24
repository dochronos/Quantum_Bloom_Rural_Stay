package com.quantumbloom.backend.service;

import com.quantumbloom.backend.config.JwtTokenProvider;
import com.quantumbloom.backend.model.Product;
import com.quantumbloom.backend.model.Role;
import com.quantumbloom.backend.model.User;
import com.quantumbloom.backend.model.UserDTO;
import com.quantumbloom.backend.repository.ProductRepository;
import com.quantumbloom.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ProductRepository productRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("El correo ya está registrado");
        }

        Role role = Role.USER;

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setRole(role);

        return userRepository.save(user);
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidPasswordException("Contraseña incorrecta");
        }

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRole().name())
        );

        return jwtTokenProvider.generateToken(
                user.getEmail(),
                user.getId(),
                authorities
        );
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
    }

    @Transactional
    public void addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (user.getFavorites().contains(product)) {
            throw new RuntimeException("El producto ya está en la lista de favoritos");
        }

        user.getFavorites().add(product);
        userRepository.save(user);
    }

    @Transactional
    public void removeFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!user.getFavorites().contains(product)) {
            throw new RuntimeException("El producto no está en la lista de favoritos");
        }

        user.getFavorites().remove(product);
        userRepository.save(user);
    }

    public List<Product> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        return new ArrayList<>(user.getFavorites());
    }

    // Excepciones personalizadas
    public static class EmailAlreadyExistsException extends RuntimeException {
        public EmailAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class InvalidPasswordException extends RuntimeException {
        public InvalidPasswordException(String message) {
            super(message);
        }
    }
}

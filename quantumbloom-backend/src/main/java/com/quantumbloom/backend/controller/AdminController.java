package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.model.Role;
import com.quantumbloom.backend.model.User;
import com.quantumbloom.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Asignar rol ADMIN a un usuario específico
    @PutMapping("/users/{userId}/make-admin")
    public ResponseEntity<User> makeAdmin(@PathVariable Long userId) {
        User user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity.badRequest().body(user); // Ya es admin
        }

        user.setRole(Role.ADMIN);
        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}

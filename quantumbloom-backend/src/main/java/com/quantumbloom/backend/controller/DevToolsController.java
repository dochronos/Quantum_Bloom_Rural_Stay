package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("dev") // Solo activo en entorno de desarrollo
public class DevToolsController {

    @Autowired
    private ProductRepository productRepository;

    @DeleteMapping("/reset-db")
    public String resetDatabase() {
        productRepository.deleteAll();
        return "¡Base de datos reiniciada!";
    }
}

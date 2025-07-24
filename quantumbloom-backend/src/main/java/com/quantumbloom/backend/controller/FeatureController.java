package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.model.Feature;
import com.quantumbloom.backend.service.FeatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "http://localhost:3000")
public class FeatureController {

    private final FeatureService featureService;

    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    // Crear una nueva característica
    @PostMapping
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) {
        Feature createdFeature = featureService.createFeature(feature.getName(), feature.getIcon());
        return ResponseEntity.ok(createdFeature);
    }

    // Obtener todas las características
    @GetMapping
    public ResponseEntity<List<Feature>> getAllFeatures() {
        List<Feature> features = featureService.getAllFeatures();
        return ResponseEntity.ok(features);
    }

    // Actualizar una característica existente
    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeature(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String icon
    ) {
        Feature updatedFeature = featureService.updateFeature(id, name, icon);
        return ResponseEntity.ok(updatedFeature);
    }

    // Eliminar una característica
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable Long id) {
        featureService.deleteFeature(id);
        return ResponseEntity.noContent().build();
    }
}

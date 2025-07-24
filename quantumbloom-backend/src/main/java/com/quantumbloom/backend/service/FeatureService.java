package com.quantumbloom.backend.service;

import com.quantumbloom.backend.model.Feature;
import com.quantumbloom.backend.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {

    private final FeatureRepository featureRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public Feature createFeature(String name, String icon) {
        Feature feature = new Feature();
        feature.setName(name);
        feature.setIcon(icon);
        return featureRepository.save(feature);
    }

    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    public Feature updateFeature(Long id, String name, String icon) {
        return featureRepository.findById(id).map(feature -> {
            feature.setName(name);
            feature.setIcon(icon);
            return featureRepository.save(feature);
        }).orElseThrow(() -> new FeatureNotFoundException("Característica no encontrada con ID: " + id));
    }

    public void deleteFeature(Long id) {
        if (!featureRepository.existsById(id)) {
            throw new FeatureNotFoundException("No se puede eliminar: característica no encontrada con ID: " + id);
        }
        featureRepository.deleteById(id);
    }

    // Excepción personalizada para claridad
    public static class FeatureNotFoundException extends RuntimeException {
        public FeatureNotFoundException(String message) {
            super(message);
        }
    }
}

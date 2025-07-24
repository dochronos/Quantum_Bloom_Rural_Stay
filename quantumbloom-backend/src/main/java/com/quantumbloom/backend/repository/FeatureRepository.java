package com.quantumbloom.backend.repository;

import com.quantumbloom.backend.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
}

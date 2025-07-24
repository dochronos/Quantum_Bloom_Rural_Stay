package com.quantumbloom.backend.service;

import com.quantumbloom.backend.model.Feature;
import com.quantumbloom.backend.model.Product;
import com.quantumbloom.backend.model.ProductDTO;
import com.quantumbloom.backend.repository.FeatureRepository;
import com.quantumbloom.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final FeatureRepository featureRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, FeatureRepository featureRepository) {
        this.productRepository = productRepository;
        this.featureRepository = featureRepository;
    }

    public boolean productExists(String name) {
        return productRepository.existsByName(name);
    }

    public Product createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setType(productDTO.getType());
        product.setPrice(String.format("$%,.0f/h", productDTO.getPrice()));
        product.setRating(productDTO.getRating());
        product.setImages(productDTO.getImages());
        product.setDescription(productDTO.getDescription());
        product.setOccupiedDates(productDTO.getOccupiedDates());
        product.setLocation(productDTO.getLocation());

        List<Feature> features = featureRepository.findAllById(productDTO.getFeatureIds());
        product.setFeatures(features);

        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Producto no encontrado con ID: " + id);
        }
        productRepository.deleteById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<String> findProductNamesContaining(String query) {
        return productRepository.findByNameContainingIgnoreCase(query)
                .stream()
                .map(Product::getName)
                .toList();
    }

    public List<Product> searchProducts(String searchTerm, String startDate, String endDate) {
        // Implementación simple basada en nombre (mejorable en el futuro con fechas)
        return productRepository.findByNameContainingIgnoreCase(searchTerm);
    }

    @Transactional
    public Product updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con ID: " + id));

        product.setName(productDTO.getName());
        product.setType(productDTO.getType());
        product.setPrice(String.format("$%,.0f/h", productDTO.getPrice()));
        product.setRating(productDTO.getRating());
        product.setImages(productDTO.getImages());
        product.setDescription(productDTO.getDescription());
        product.setOccupiedDates(productDTO.getOccupiedDates());
        product.setLocation(productDTO.getLocation());

        List<Feature> features = featureRepository.findAllById(productDTO.getFeatureIds());
        product.setFeatures(features);

        return productRepository.save(product);
    }

    // Excepción personalizada para mayor claridad
    public static class ProductNotFoundException extends RuntimeException {
        public ProductNotFoundException(String message) {
            super(message);
        }
    }
}

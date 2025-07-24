package com.quantumbloom.backend.controller;

import com.quantumbloom.backend.model.Product;
import com.quantumbloom.backend.model.ProductDTO;
import com.quantumbloom.backend.service.ProductService;
import com.quantumbloom.backend.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ ProductController inicializado correctamente.");
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            if (productService.productExists(productDTO.getName())) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "El nombre ya existe"));
            }
            Product createdProduct = productService.createProduct(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("error", "Error al crear el producto: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Producto no encontrado")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Producto eliminado correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("error", "Error al eliminar el producto"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDTO);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("error", "Error al actualizar el producto"));
        }
    }

    @GetMapping("/suggestions")
    public ResponseEntity<?> getProductSuggestions(@RequestParam String query) {
        try {
            List<String> suggestions = productService.findProductNamesContaining(query);
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("error", "Error al obtener sugerencias"));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        try {
            List<Product> products = productService.searchProducts(searchTerm, startDate, endDate);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("error", "Error al buscar productos"));
        }
    }
}

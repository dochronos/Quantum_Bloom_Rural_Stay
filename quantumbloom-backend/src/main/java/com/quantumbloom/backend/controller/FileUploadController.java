package com.quantumbloom.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaTypeFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private final Path uploadDir = Paths.get("backend/uploads").toAbsolutePath().normalize();

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<List<String>> handleFileUpload(@RequestParam("files") MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        String baseUrl = "http://localhost:8080/uploads";

        for (MultipartFile file : files) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = uploadDir.resolve(fileName);

            try {
                Files.createDirectories(path.getParent());
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                fileUrls.add(baseUrl + "/" + fileName);
            } catch (Exception e) {
                return ResponseEntity.internalServerError().build();
            }
        }

        return ResponseEntity.ok(fileUrls);
    }

    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = uploadDir.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                MediaType mediaType = MediaTypeFactory.getMediaType(file)
                        .orElse(MediaType.APPLICATION_OCTET_STREAM);

                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

-- ==========================
-- USUARIO DE PRUEBA (DEMO)
-- ==========================
-- Email: demo@quantumbloom.com
-- Contraseña (texto plano): 123456
-- Contraseña encriptada con BCrypt:
-- $2a$10$XbXJQvgVfAqf0MeFfA0LReUZZjFyqF8uVlO8zXDGRkIBhC5JrTUSq

INSERT INTO users (id, email, password, name, role) VALUES
(1, 'demo@quantumbloom.com', '$2a$10$XbXJQvgVfAqf0MeFfA0LReUZZjFyqF8uVlO8zXDGRkIBhC5JrTUSq', 'Demo User', 'USER');

-- ==========================
-- PRODUCTOS / ALOJAMIENTOS
-- ==========================

INSERT INTO product (id, name, type, price, rating, description, location, user_id) VALUES
(1, 'Cabaña El Silencio', 'Cabaña', '$35,000/noche', 4.9, 'Cabaña rústica en medio del bosque, ideal para desconectar del ruido.', 'Villa General Belgrano, Córdoba', 1),
(2, 'EcoDomo Tierra Viva', 'Domo geodésico', '$18,500/noche', 4.7, 'Domo sustentable con energía solar y vista panorámica.', 'El Bolsón, Río Negro', 1),
(3, 'Casa Rural Las Margaritas', 'Casa de campo', '$22,000/noche', 4.6, 'Casa rural equipada para familias, rodeada de naturaleza.', 'San Javier, Tucumán', 1);

-- ==========================
-- IMÁGENES POR PRODUCTO
-- ==========================

INSERT INTO product_images (product_id, image_url) VALUES
-- Cabaña El Silencio
(1, 'https://quantumbloom.com/images/cabana-1.webp'),
(1, 'https://quantumbloom.com/images/cabana-2.webp'),

-- EcoDomo Tierra Viva
(2, 'https://quantumbloom.com/images/domo-1.webp'),
(2, 'https://quantumbloom.com/images/domo-2.jpg'),

-- Casa Rural Las Margaritas
(3, 'https://quantumbloom.com/images/casa-1.png'),
(3, 'https://quantumbloom.com/images/casa-2.webp');

-- ==========================
-- FECHAS OCUPADAS
-- ==========================

INSERT INTO product_occupied_dates (product_id, date) VALUES
-- Cabaña El Silencio
(1, '2025-07-20'),
(1, '2025-07-21'),

-- EcoDomo Tierra Viva
(2, '2025-07-19'),

-- Casa Rural Las Margaritas
(3, '2025-07-22');

-- ==========================
-- CARACTERÍSTICAS
-- ==========================

INSERT INTO feature (id, name, icon) VALUES
(1, 'Desayuno incluído', 'breakfast-icon'),
(2, 'Vista a la montaña', 'mountain-icon'),
(3, 'Wi-Fi rural', 'wifi-icon'),
(4, 'Pet Friendly', 'pet-icon'),
(5, 'Energía solar', 'solar-icon');

-- ==========================
-- PRODUCTO - CARACTERÍSTICAS
-- ==========================

INSERT INTO product_features (product_id, feature_id) VALUES
-- Cabaña El Silencio
(1, 1),
(1, 2),
(1, 3),

-- EcoDomo Tierra Viva
(2, 2),
(2, 5),
(2, 3),

-- Casa Rural Las Margaritas
(3, 1),
(3, 3),
(3, 4);

-- ==========================
-- RESEÑAS
-- ==========================

INSERT INTO review (rating, comment, user_id, product_id) VALUES
(5.0, 'Una experiencia mágica, la cabaña es hermosa.', 1, 1),
(4.5, 'Muy cómoda y con vistas increíbles.', 1, 1),
(4.8, 'El domo fue muy original, volvería.', 1, 2),
(4.4, 'Perfecto para un fin de semana en familia.', 1, 3);

-- ==========================
-- RESERVA DE EJEMPLO
-- ==========================

INSERT INTO reservation (user_id, product_id, reservation_date, is_completed) VALUES
(1, 1, '2025-07-20', false);

-- ==========================
-- FAVORITO MARCADO
-- ==========================

INSERT INTO user_favorites (user_id, product_id) VALUES
(1, 1),
(1, 2);

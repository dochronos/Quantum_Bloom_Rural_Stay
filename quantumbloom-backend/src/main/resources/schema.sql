-- ==========================
-- USUARIOS
-- ==========================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50)
);

-- ==========================
-- PRODUCTOS
-- ==========================
CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    price VARCHAR(255),
    rating DOUBLE,
    description TEXT,
    location VARCHAR(255),
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ==========================
-- IMÁGENES DE PRODUCTO
-- ==========================
CREATE TABLE IF NOT EXISTS product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- ==========================
-- FECHAS OCUPADAS DE PRODUCTO
-- ==========================
CREATE TABLE IF NOT EXISTS product_occupied_dates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    date DATE,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- ==========================
-- CARACTERÍSTICAS
-- ==========================
CREATE TABLE IF NOT EXISTS feature (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    icon VARCHAR(255)
);

-- ==========================
-- RELACIÓN PRODUCTO - CARACTERÍSTICA
-- ==========================
CREATE TABLE IF NOT EXISTS product_features (
    product_id BIGINT NOT NULL,
    feature_id BIGINT NOT NULL,
    PRIMARY KEY (product_id, feature_id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (feature_id) REFERENCES feature(id)
);

-- ==========================
-- RESERVAS
-- ==========================
CREATE TABLE IF NOT EXISTS reservation (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,
    reservation_date DATE,
    is_completed BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- ==========================
-- RESEÑAS
-- ==========================
CREATE TABLE IF NOT EXISTS review (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rating DOUBLE,
    comment TEXT,
    user_id BIGINT,
    product_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- ==========================
-- FAVORITOS DE USUARIO
-- ==========================
CREATE TABLE IF NOT EXISTS user_favorites (
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

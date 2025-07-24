# QuantumBloom 🌿 – Proyecto Profesional Developer

**QuantumBloom** es una plataforma web para la reserva de estancias rurales. Permite a los usuarios explorar alojamientos, gestionar reservas, y a los administradores publicar y administrar propiedades desde un panel seguro y personalizado.

Este sistema fue desarrollado como entrega final del curso **Professional Developer**, utilizando **React** para el frontend y **Java con Spring Boot** para el backend. El proyecto aplica una arquitectura basada en microservicios, JWT para autenticación, comunicación HTTP vía REST y un enfoque responsive en su diseño visual.

---

## 🔧 Estructura del Proyecto

quantumbloom/
├── quantumbloom-frontend/ # Aplicación React
├── quantumbloom-backend/ # Backend con microservicios en Java
└── README.md # Este archivo


---

## 🚀 Tecnologías utilizadas

### Frontend

- React 19 (CRA)
- React Router DOM
- React Datepicker / Date Range
- React Big Calendar
- Google Maps API (env variable)
- Axios
- JWT Decode
- Toastify

### Backend

- Java 21
- Spring Boot 3.2.4
- Spring Cloud 2023.0.1
- Spring Security + JWT
- Spring Data JPA
- SQLite
- Eureka Server / Config Server / API Gateway

---

## 📂 Instalación

### 1. Clonar el repositorio

git clone https://github.com/usuario/quantumbloom.git
cd quantumbloom

### 2. Configurar variables de entorno

Frontend (quantumbloom-frontend/)
Crear un archivo .env con tu API Key de Google Maps:
    REACT_APP_GOOGLE_MAPS_API_KEY=tu_api_key_aqui

Backend (quantumbloom-backend/)
Asegurarse de tener la base de datos SQLite preconfigurada (money-dh.db) en la ruta correspondiente, o cambiar la configuración según sea necesario.

📦 Scripts de desarrollo

Frontend
cd quantumbloom-frontend
npm install
npm start

Backend
cd quantumbloom-backend
mvn clean install
mvn spring-boot:run

🔐 Accesos de ejemplo
Las credenciales de prueba fueron incluidas en la base de datos preconfigurada para poder acceder como usuario y administrador:

Usuario: user1@quantumbloom.com

Admin: admin@quantumbloom.com

Contraseña común: 123456
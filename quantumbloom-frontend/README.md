# QuantumBloom Frontend 🌿

Este repositorio contiene el frontend de QuantumBloom, una plataforma de reservas desarrollada con React que ofrece una experiencia clara, adaptativa y moderna tanto para usuarios como para administradores.

## 🚀 Tecnologías

- React 19
- React Router DOM 6
- JWT Decode
- Axios
- React Datepicker / Date Range
- React Toastify
- Moment.js
- Google Maps API
- React Big Calendar

## 📁 Estructura de carpetas

quantumbloom-frontend/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── App.js
│ ├── index.js
│ └── ...
├── .env.example
├── package.json
└── README.md


## ⚙️ Instalación

1. Clonar el repositorio:
   
   git clone https://github.com/dochronos/Quantum_Bloom_Rural_Stay
   cd quantumbloom-frontend
   npm install

2. Crear un archivo .env en la raíz del frontend, siguiendo el formato de .env.example.

3. Iniciar la aplicación:
   npm start

🔐 Autenticación

El sistema utiliza JWT almacenado en localStorage para mantener la sesión del usuario. El frontend decodifica el token para obtener roles y datos del usuario actual.

👥 Roles soportados

USER: acceso general, reservas, favoritos, perfil.

ADMIN: acceso al panel de administración, gestión de productos, usuarios, características y categorías.

🧪 Estado del desarrollo

 Registro e inicio de sesión

 Vista de productos y detalles

 Galería de imágenes

 Reservas y calendario

 Favoritos y perfil de usuario

 Dashboard de administrador

 Gestión de productos, usuarios, características y categorías

🧠 Consideraciones
Este proyecto está conectado con un backend desarrollado en Spring Boot.

El backend debe estar corriendo en http://localhost:8080 o configurarse mediante proxy en el package.json.
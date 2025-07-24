🌿 QuantumBloom Backend
Backend desarrollado en Java con Spring Boot para la aplicación QuantumBloom Rural Stay, una plataforma de reservas de alojamientos rurales.

⚙️ Tecnologías principales
Java 22 + Spring Boot 3.3.0

Spring Security (con JWT)

Spring Data JPA + Hibernate

Base de datos H2 en memoria

JJWT (manejo de tokens JWT)

BCrypt (encriptación de contraseñas)

Arquitectura RESTful

Maven

📦 Estructura del proyecto

quantumbloom-backend/
├── src/
│   ├── main/
│   │   ├── java/com/quantumbloom/backend/
│   │   │   ├── config/         # Configuraciones de seguridad y JWT
│   │   │   ├── controller/     # Controladores REST
│   │   │   ├── mapper/         # Mappers entre DTO y entidades
│   │   │   ├── model/          # Entidades JPA y DTOs
│   │   │   ├── repository/     # Repositorios Spring Data JPA
│   │   │   └── service/        # Lógica de negocio
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── data.sql        # Datos de ejemplo
│   │       └── schema.sql      # Estructura de la base de datos
└── pom.xml

🔐 Autenticación
El backend implementa autenticación JWT con control de acceso basado en roles:

USER: Acceso a funcionalidades básicas (ver productos, hacer reservas, dejar reseñas).

ADMIN: Gestión completa del sistema.

📬 Funcionalidad de envío de correos (desactivada)
El proyecto cuenta con una clase de servicio (EmailService.java) preparada para enviar correos electrónicos de confirmación de reservas. Esta funcionalidad no se encuentra activa en esta versión, ya que:

El proyecto no será deployado en un entorno productivo.

No se ha configurado un proveedor SMTP real (como Gmail, SendGrid o Mailtrap).

Se ha decidido mantener el código comentado para evitar errores en entornos locales o educativos sin configuración de correo.

Sin embargo, el código está presente y correctamente estructurado, permitiendo su activación inmediata con solo:

Descomentar el contenido en EmailService.java.

Configurar los parámetros SMTP en application.properties.

Esto demuestra que el backend contempla flujos reales de interacción con el usuario, como la confirmación por correo.

🧪 Datos de prueba (data.sql)
Se incluyen datos de ejemplo para probar la aplicación sin necesidad de un sistema de administración:

👤 Usuario de prueba
Email	Contraseña	Rol
demo@quantumbloom.com	123456	USER

🔒 La contraseña está encriptada con BCrypt.

🏡 Alojamientos cargados
Cabaña El Silencio

Ubicación: Villa General Belgrano, Córdoba

Precio: $35,000/noche

Características: Wi-Fi rural, desayuno incluido, vista a la montaña

Estado: ocupada los días 2025-07-20 y 2025-07-21

Casa de Campo La Tranquera

Ubicación: San Rafael, Mendoza

Precio: $28,000/noche

Características: pileta, asador, desayuno

Ocupada: 2025-07-22

Estancia Las Margaritas

Ubicación: Tandil, Buenos Aires

Precio: $32,000/noche

Características: cabalgatas, Wi-Fi rural, actividades al aire libre

Ocupada: 2025-07-23

También se incluyen reseñas, favoritos y reservas para probar toda la funcionalidad.
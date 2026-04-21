Informe de Desarrollo: TechConnect Pro Marketplace
Desarrolladores: * Rodrigo Anderson Aedo Tutaya

Christopher Jenko Oscco Arotinco

Repositorio: https://github.com/TU_USUARIO/TechConnect-pro

1. Resumen de Actualizaciones (UI/UX)
Se ha transformado la interfaz de usuario para ofrecer una experiencia rústica, profesional y ordenada:

Estética: Implementación de un fondo con textura de cuero y una paleta de colores rústica basada en Oro Viejo, Cuero y Antracita.

Visibilidad: Corrección de contraste en textos de búsqueda, formularios y el título de inicio de sesión, ahora totalmente legibles en negro sólido.

Optimización de Espacios: Se aumentó la separación del buscador y las categorías por 25px, y las tarjetas de servicios cuentan con un margen de 40px para evitar la saturación visual.

Identidad de Marca: Rediseño del botón "Salir" a un estilo negro sólido minimalista para garantizar su visibilidad en cualquier navegador.

2. Guía de Inicio para Colaboradores
Para clonar y ejecutar el proyecto en una computadora nueva, se deben seguir estos comandos en la terminal de Visual Studio Code:

A. Clonación del Proyecto
Bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/TechConnect-pro.git

# Entrar a la carpeta principal
cd TechConnect-pro
B. Instalación y Preparación
Es obligatorio instalar las dependencias antes del primer arranque:

Bash
# Entrar a la carpeta del frontend
cd frontend

# Instalar librerías (Lucide-React, SweetAlert2, Hook-Form)
npm install
C. Arranque del Sistema
Bash
# Iniciar el servidor local
npm run dev
Credenciales de Acceso:

Usuario: admin@admin.com

Contraseña: 123456

3. Notas Técnicas
El proyecto utiliza React con Vite para un rendimiento óptimo.

Se ha centralizado el diseño en frontend/src/App.css para facilitar futuras modificaciones estéticas.

La estructura de datos para los servicios incluye categorías de Corte, Barba, Estilo y Productos con etiquetas personalizadas.

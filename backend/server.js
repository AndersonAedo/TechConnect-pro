require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Verificación inicial de carga de variables
console.log('--- Intentando Conexión ---');
console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);

// 1. Configuración de Sequelize para MySQL en Aiven
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT), 
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,
                ca: fs.readFileSync(path.join(__dirname, 'ca.pem')).toString(),
            }
        },
        logging: false // Mantiene la consola limpia
    }
);

// 2. Modelo de la Base de Datos
const Servicio = sequelize.define('Servicio', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    imagen: DataTypes.STRING,
    categoria: DataTypes.STRING
}, { 
    paranoid: true // Habilita Soft Delete
});

// 3. Función de inicio del servidor
const startServer = async () => {
    try {
        // Verificar conexión
        await sequelize.authenticate();
        console.log('✅ CONEXIÓN EXITOSA: Aiven MySQL ha aceptado las credenciales.');
        
        // Sincronizar tablas
        await sequelize.sync({ alter: true });
        console.log('🚀 TABLAS ACTUALIZADAS: La estructura está lista.');
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`📡 SERVIDOR ACTIVO: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ ERROR DE CONEXIÓN:');
        console.error('Detalle:', error.message);
        console.log('\n--- Posibles Soluciones ---');
        console.log('1. Revisa que el archivo ca.pem esté en la misma carpeta que server.js');
        console.log('2. Asegúrate de que el estado en Aiven sea "RUNNING".');
        console.log('3. Verifica que la contraseña en el .env no tenga espacios extra.');
    }
};

startServer();
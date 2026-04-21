require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors()); // Permite que el frontend se conecte
app.use(express.json()); // Permite leer datos en formato JSON

// 1. Configuración de Sequelize
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
        logging: false 
    }
);

// 2. Modelo de la Base de Datos
const Servicio = sequelize.define('Servicio', {
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    categoria: DataTypes.STRING,
    imagen: DataTypes.TEXT // Usamos TEXT por si la URL es muy larga
}, { paranoid: true });

// 3. RUTAS (Endpoints)
// Obtener todos los servicios
app.get('/servicios', async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Guardar un nuevo servicio
app.post('/servicios', async (req, res) => {
    try {
        const nuevo = await Servicio.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4. Inicio del servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('✅ BACKEND CONECTADO A AIVEN');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`📡 SERVIDOR EN PUERTO ${process.env.PORT || 3000}`);
        });
    } catch (error) {
        console.error('❌ ERROR:', error.message);
    }
};

startServer();
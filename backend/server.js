const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Configuración de CORS con opciones específicas
const corsOptions = {
  origin: 'https://www.primecasino.io', // Permitir solicitudes solo desde este dominio
  optionsSuccessStatus: 200, // Responder con un estatus 200 para solicitudes exitosas
};

app.use(cors(corsOptions)); // Aplicar configuración de CORS

// Middleware para parsear JSON
app.use(express.json());

// Definir rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/keno', require('./routes/kenoRoutes'));  // Asegúrate de que esto está aquí

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

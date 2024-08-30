const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Esta opción ya no tiene efecto desde la versión 4.0 del driver de MongoDB
            useUnifiedTopology: true, // Esta opción también es redundante con las versiones más recientes del driver
            tls: true, // Habilitar TLS/SSL
            tlsAllowInvalidCertificates: true, // Permitir certificados inválidos (solo usar en entornos de desarrollo)
        });

        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

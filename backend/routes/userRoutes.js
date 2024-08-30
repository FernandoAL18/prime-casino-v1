const express = require('express');
const router = express.Router();
const { getUserProfile, updateBalance } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', protect, getUserProfile);

// Ruta protegida para actualizar el balance del usuario
router.post('/update-balance', protect, updateBalance);

module.exports = router;

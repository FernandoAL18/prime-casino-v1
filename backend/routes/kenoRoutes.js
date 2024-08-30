const express = require('express');
const router = express.Router();
const { playKeno } = require('../controllers/kenoController');
const { protect } = require('../middleware/authMiddleware');

// Ruta para jugar Keno
router.post('/play', protect, playKeno);

module.exports = router;

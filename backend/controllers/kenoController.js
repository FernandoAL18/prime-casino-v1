// controllers/kenoController.js
const KenoBet = require('../models/KenoBet');
const User = require('../models/userModel');

exports.playKeno = async (req, res) => {
    const { selectedNumbers, betAmount } = req.body;

    // Validar si se han seleccionado exactamente 10 números
    if (!selectedNumbers || selectedNumbers.length !== 10) {
        return res.status(400).json({ msg: 'You must select exactly 10 numbers.' });
    }

    try {
        // Obtener usuario
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Verificar si el usuario tiene fondos suficientes
        if (user.balances['USD'] < betAmount) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }

        // Generar números aleatorios para el resultado de Keno
        const resultNumbers = generateKenoNumbers();

        // Calcular ganancias
        const matches = selectedNumbers.filter(num => resultNumbers.includes(num));
        const winAmount = calculateWinnings(matches.length, betAmount);

        // Actualizar balance del usuario
        user.balances['USD'] -= betAmount;
        user.balances['USD'] += winAmount;

        // Guardar cambios en el balance del usuario
        await user.save();

        // Guardar la apuesta en la base de datos
        const newBet = new KenoBet({
            user: req.user.id,
            selectedNumbers,
            betAmount,
            resultNumbers,
            winAmount,
        });

        await newBet.save();

        // Enviar respuesta con el resultado de la apuesta
        res.json({ resultNumbers, winAmount, newBalance: user.balances['USD'] });

    } catch (err) {
        console.error('Error processing Keno bet:', err.message);
        res.status(500).send('Server error');
    }
};

// Función para generar números aleatorios únicos entre 1 y 80
const generateKenoNumbers = () => {
    const numbers = [];
    while (numbers.length < 20) {
        const num = Math.floor(Math.random() * 80) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};

// Función para calcular las ganancias según el número de aciertos
const calculateWinnings = (matches, betAmount) => {
    const payoutTable = {
        0: 0,
        1: 0,
        2: 0,
        3: betAmount * 0.5,
        4: betAmount * 1,
        5: betAmount * 5,
        6: betAmount * 10,
        7: betAmount * 50,
        8: betAmount * 100,
        9: betAmount * 500,
        10: betAmount * 1000,
    };

    return payoutTable[matches] || 0;
};

module.exports = { playKeno };


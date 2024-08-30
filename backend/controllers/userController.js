const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Registrar usuario
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password,
            balances: {
                USD: 0.00,
                BTC: 0.00,
                ETH: 0.00,
                LTC: 0.00,
                TRX: 0.00,
                XRP: 0.00,
                DOGE: 0.00,
                SOL: 0.00,
            }
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) {
                    console.error('Error generating token:', err);
                    throw err;
                }
                console.log('Generated token:', token);
                res.status(201).json({ token });
            }
        );
        

    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).send('Server error');
    }
};

// Iniciar sesión del usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Server error');
    }
};

// Obtener perfil del usuario autenticado
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateBalance = async (req, res) => {
    const { crypto, amount } = req.body;
    const validCurrencies = ['USD', 'BTC', 'ETH', 'LTC', 'TRX', 'XRP', 'DOGE', 'SOL'];

    console.log('Requested currency:', crypto);
    console.log('Valid currencies:', validCurrencies);

    if (!validCurrencies.includes(crypto)) {
        return res.status(400).json({ msg: 'Invalid currency' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.balances[crypto] = (user.balances[crypto] || 0) + parseFloat(amount);  // Actualiza el balance

        await user.save();  // Guarda el usuario actualizado en la base de datos

        res.json({ msg: 'Balance updated successfully', balances: user.balances });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
//userController.js
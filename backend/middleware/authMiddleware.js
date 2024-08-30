const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            req.user = await User.findById(decoded.user.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ msg: 'User not found' });
            }

            next();
        } catch (err) {
            console.error('Token verification failed:', err.message);
            res.status(401).json({ msg: 'Not authorized, token failed', error: err.message });
        }
    } else {
        res.status(401).json({ msg: 'Not authorized, no token' });
    }
};

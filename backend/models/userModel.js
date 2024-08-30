const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balances: {
        USD: { type: Number, default: 0.00 },
        BTC: { type: Number, default: 0.00 },
        ETH: { type: Number, default: 0.00 },
        LTC: { type: Number, default: 0.00 },
        TRX: { type: Number, default: 0.00 },
        XRP: { type: Number, default: 0.00 },
        DOGE: { type: Number, default: 0.00 },
        SOL: { type: Number, default: 0.00 },
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;

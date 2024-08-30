// models/KenoBet.js
const mongoose = require('mongoose');

const kenoBetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    selectedNumbers: {
        type: [Number],
        required: true,
    },
    betAmount: {
        type: Number,
        required: true,
    },
    resultNumbers: {
        type: [Number],
        required: true,
    },
    winAmount: {
        type: Number,
        default: 0.00,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const KenoBet = mongoose.model('KenoBet', kenoBetSchema);
module.exports = KenoBet;

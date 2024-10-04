const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: String,
    jobTitle: String,
    companyName: String,
    email: String,
    phone: String,
    address: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('visiting_cards', cardSchema);

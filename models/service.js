const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Vergi xidməti', 'Mühasibat xidməti', 'Mətbəə', 'Poliqrafiya'],
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Service', serviceSchema);
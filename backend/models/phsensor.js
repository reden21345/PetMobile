const mongoose = require('mongoose');

const phDataSchema = mongoose.Schema({
    ph: { type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['Acidic', 'Normal', 'Alkaline'], 
        required: true 
    },
    unit: { 
        type: String, 
        default: 'pH' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

exports.PHData = mongoose.model('PHData', phDataSchema);

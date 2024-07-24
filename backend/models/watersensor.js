const mongoose = require('mongoose');

const waterLevelSchema = mongoose.Schema({
    waterLevel: { 
        type: Number, 
        required: true 
    },
    unit: { 
        type: String, 
        default: '%' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

exports.WaterLevel = mongoose.model('WaterLevel', waterLevelSchema);

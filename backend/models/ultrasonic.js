const mongoose = require('mongoose');

const foodLevelSchema = mongoose.Schema({
    foodLevel: { 
        type: Number,
         required: true 
        },
    unit: { 
        type: String, 
        default: 'g' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

exports.FoodLevel = mongoose.model('FoodLevel', foodLevelSchema);

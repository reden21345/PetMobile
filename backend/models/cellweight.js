const mongoose = require('mongoose');

const CellweightDataSchema = mongoose.Schema({
    weightScale: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
})

exports.CellweightData = mongoose.model('CellweightData', CellweightDataSchema);

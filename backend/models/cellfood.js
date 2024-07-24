const mongoose = require('mongoose');

const loadCellSchema = mongoose.Schema({
    weight: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        default: 'g'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
})

// mongoose.model('LoadCell', loadCellSchema)
exports.LoadCell = mongoose.model('LoadCell', loadCellSchema);

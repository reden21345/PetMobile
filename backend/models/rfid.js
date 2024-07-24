const mongoose = require('mongoose');

const rfidSchema = mongoose.Schema({
    uid: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

exports.RFID = mongoose.model('RFID', rfidSchema);

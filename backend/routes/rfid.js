const express = require('express');
const { RFID } = require('../models/rfid');

const router = express.Router();

router.get(`/rfid-data`, async (req, res) =>{

    const rfid = await RFID.find();

    if(!rfid) {
        res.status(500).json({success: false})
    } 

    res.send(rfid);
})

module.exports = router
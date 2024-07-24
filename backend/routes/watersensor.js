const express = require('express');
const { WaterLevel } = require('../models/watersensor');

const router = express.Router();

router.get(`/waterlevel-data`, async (req, res) =>{

    const level = await WaterLevel.find();

    if(!level) {
        res.status(500).json({success: false})
    } 

    res.send(level);
})

module.exports = router
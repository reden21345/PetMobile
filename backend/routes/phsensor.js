const express = require('express');
const { PHData } = require('../models/phsensor');

const router = express.Router();

router.get(`/ph-data`, async (req, res) =>{

    const ph = await PHData.find();

    if(!ph) {
        res.status(500).json({success: false})
    } 

    res.send(ph);
})

module.exports = router
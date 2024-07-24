const express = require('express');
const { CellweightData } = require('../models/cellweight');

const router = express.Router();

router.get(`/loadcell-data`, async (req, res) =>{

    const cellWeight = await CellweightData.find();

    if(!cellWeight) {
        res.status(500).json({success: false})
    } 

    res.send(cellWeight);
})

module.exports = router
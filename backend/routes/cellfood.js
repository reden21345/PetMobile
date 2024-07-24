const express = require('express');
const { LoadCell } = require('../models/cellfood');

const router = express.Router();

router.get(`/loadcell-food-data`, async (req, res) =>{

    const cellFood = await LoadCell.find();

    if(!cellFood) {
        res.status(500).json({success: false})
    } 

    res.send(cellFood);
})

module.exports = router
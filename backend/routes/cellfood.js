const express = require('express');
const { LoadCell } = require('../models/cellfood');

const router = express.Router();

router.get(`/loadcell-food-data`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234

    const cellFood = await LoadCell.find();

    if(!cellFood) {
        res.status(500).json({success: false})
    } 

    res.send(cellFood);
})

module.exports = router
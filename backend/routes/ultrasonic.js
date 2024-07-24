const express = require('express');
const { FoodLevel } = require('../models/ultrasonic');

const router = express.Router();

router.get(`/foodlevel-data`, async (req, res) =>{

    const foodlevel = await FoodLevel.find();

    if(!foodlevel) {
        res.status(500).json({success: false})
    } 

    res.send(foodlevel);
})

module.exports = router
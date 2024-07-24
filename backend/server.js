const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = 3001
const {mongoURL} = require('./keys')

app.use(bodyParser.json())

// Connection to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error', ()=>{
    console.log("Error on connecting to MongoDB")
})


app.listen(PORT, ()=>{
    console.log("Server running on Port "+ PORT)
})


// Routes
const cellFood = require('./routes/cellfood')
const cellweight = require('./routes/cellweight')
const phdata = require('./routes/phsensor')
const rfid = require('./routes/rfid')
const ultrasonic = require('./routes/ultrasonic')
const waterLevel = require('./routes/watersensor')

app.use('/api', cellFood, cellweight, phdata, rfid, ultrasonic, waterLevel)
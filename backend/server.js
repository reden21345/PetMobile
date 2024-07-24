const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const {mongoURL} = require('./keys')

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



app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send('TANGINA NAMAN')
})

app.post('/', (req,res)=>{
    console.log(req.body)
    // res.send('Hello')
})

app.listen(PORT, ()=>{
    console.log("Server running on Port "+ PORT)
})
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')

const todoRoutes = require('./routes/todo-routes')

const app = express()
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methodes', '*')
    next()
})
app.use('/api/todo', todoRoutes)

mongoose
.connect('mongodb://127.0.0.1:27017/todo')
.then(() =>{
    app.listen(8000)
 
})
.catch(err => {
    console.log(err)
})
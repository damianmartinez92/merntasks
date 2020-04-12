const express = require('express')
const path = require('path')

const app = express()

// Settings
app.set('port', process.env.PORT || 4000) // toma el puerto y sino 4000
app.set('views', path.join(__dirname + 'views')) // definimos la ruta relativa a views

// Middlewares
app.use(express.urlencoded({extended: false}))

// Global Variables


// Routes
app.get('/', (req, res) => {
    res.send("hola")
})

// Static Files 
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', userRoutes)


module.exports = app
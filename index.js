const express = require('express')
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', userRoutes)


const port = process.env.PORT || 2011
app.listen(port, () => {
    console.log(`App is up and running on port ${port}`)
})
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8000

const peopleRoutes = require('./routes/people_routes')
const userRoutes = require('./routes/user-routes')
const petRoutes = require('./routes/pet-routes')

mongoose.set('strictQuery', true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500` }))

app.use(express.json())

app.use(peopleRoutes)
app.use(userRoutes)
app.use(petRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = app
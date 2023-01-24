const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    animal: {
        type: String,
        required: true
    },
    name: String,
    age: Number
})

module.exports = petSchema
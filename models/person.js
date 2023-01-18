const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isEmployed: {
        type: Boolean,
        default: false,
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
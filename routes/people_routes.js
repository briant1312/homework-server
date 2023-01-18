const express = require('express')
const router = express.Router()

const Person = require('../models/person')

router.get('/people', (req, res, next) => {
    Person.find()
        .then(people => {
            return people.map(people => people)
        })
        .then(people => {
            res.json({ people: people })
        })
        .catch(next)
})

router.get('/people/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json({ person: person })
        })
        .catch(next)
})

router.post('/people', (req, res, next) => {
    Person.create(req.body.person)
        .then(person => {
            res.status(201).json({ person: person })
        })
        .catch(next)
})

module.exports = router
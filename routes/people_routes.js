const express = require('express')
const router = express.Router()
const { requireToken } = require('../config/auth')

const Person = require('../models/person')

// INDEX
router.get('/people', requireToken, (req, res, next) => {
    Person.find()
        .then(people => {
            return people.map(people => people)
        })
        .then(people => {
            res.json({ people: people })
        })
        .catch(next)
})

// SHOW
router.get('/people/:id', requireToken, (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json({ person: person })
        })
        .catch(next)
})

// CREATE
router.post('/people', requireToken, (req, res, next) => {
    Person.create(req.body.person)
        .then(person => {
            res.status(201).json({ person: person })
        })
        .catch(next)
})

// UPDATE
router.patch('/people/:id', requireToken, (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            return person.updateOne(req.body.person)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
router.delete('/people/:id', requireToken, (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            return person.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
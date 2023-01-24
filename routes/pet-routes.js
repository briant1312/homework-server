const express = require('express')

const Person = require('../models/person')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

const router = express.Router()

// CREATE
// POST /pets
router.post('/pets', requireToken, (req, res, next) => {
    const personId = req.body.pet.personId


    const pet = req.body.pet

    Person.findById(personId)
        .then(handle404)
        .then(person => {
            person.pets.push(pet)

            return person.save()
        })
        .then(person => {
            res.status(201).json({ person: person })
        })
        .catch(next)
})

// UPDATE
// PATCH /pets/:petId
router.patch('/pets/:petId', requireToken, (req, res, next) => {
    const personId = req.body.pet.personId

    const petBody = req.body.pet

    Person.findById(personId)
        .then(handle404)
        .then(person => {
            const pet = person.pets.id(req.params.petId)

            pet.set(petBody)

            return person.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /pets/:petId
router.delete('/pets/:petId', requireToken, (req, res, next) => {
    const personId = req.body.pet.personId

    Person.findById(personId)
        .then(handle404)
        .then(person => {
            person.pets.id(req.params.petId).remove()

            person.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
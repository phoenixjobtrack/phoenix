const express = require('express')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Requirement } = require('../schemas')

const router = express.Router()

//rejectUnauthenticated verifies user is logged in before displaying data

// // GET route
router.get('/', rejectUnauthenticated, (req, res) => {
  Requirement.findAll({
    where: {
      userId: req.user.id,
    },
  })
    .then((requirements) => {
      res.send(requirements)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

// POST route
router.post('/', rejectUnauthenticated, (req, res) => {
  Requirement.create({
    requirement: req.body.requirement,
    userId: req.user.id,
  })
    .then((requirement) => {
      res.send(requirement)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

//PUT route
router.put('/:id', (req, res) => {
  Requirement.update(
    {
      requirement: req.body.requirement,
    },
    {
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    },
  )
    .then((requirement) => {
      res.send(requirement)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

//DELETE route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  Requirement.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  })
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

module.exports = router

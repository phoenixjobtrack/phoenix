const express = require('express')
const pool = require('../modules/pool')
const router = express.Router()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Contact } = require('../schemas/contact')

router.get('/', rejectUnauthenticated, (req, res) => {
  Contact.findAll({
    where: {
      userId: req.user.id,
    },
  })
    .then((results) => {
      res.send(results)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

//route to get selected contact only
router.get('/current/:id', rejectUnauthenticated, (req, res) => {
  Contact.findAll({
    where: {
      userId: req.user.id,
      id: req.params.id,
    },
  })
    .then((results) => {
      res.send(results)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
  const {
    firstName,
    lastName,
    company,
    position,
    linkedinUrl,
    cell,
    phone,
    notes,
  } = req.body

  Contact.create({
    userId: req.user.id,
    firstName,
    lastName,
    company,
    position,
    linkedinUrl,
    cell,
    phone,
    notes,
  })
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const {
    firstName,
    lastName,
    company,
    position,
    linkedinUrl,
    cell,
    phone,
    notes,
  } = req.body

  Contact.update(
    {
      firstName,
      lastName,
      company,
      position,
      linkedinUrl,
      cell,
      phone,
      notes,
    },
    {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  )
    .then(() => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

module.exports = router

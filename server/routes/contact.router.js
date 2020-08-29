const express = require('express')
const router = express.Router()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Contact } = require('../schemas')

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
    email,
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
    email
  })
    .then((contact) => {
      res.status(201).send(contact);
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
    email,
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
      email,
    },
    {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  )
    .then((contact) => {
      res.status(200).send(contact);
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

module.exports = router

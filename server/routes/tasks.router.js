// ========== TASKS ROUTER ========== //
const express = require('express')
const router = express.Router()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Task } = require('../schemas')

router.get('/', rejectUnauthenticated, (req, res) => {
  Task.findAll({
    where: {
      userId: req.user.id,
    },
    order: [['id', 'DESC']],
  })
    .then((tasks) => {
      res.send(tasks)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.get('/date', rejectUnauthenticated, (req, res) => {
  Task.findAll({
    where: {
      userId: req.user.id,
    },
    order: [['dueDate']],
  })
    .then((tasks) => {
      res.send(tasks)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
  const {
    taskName,
    dueDate,
    note,
    contactId,
    jobId,
    complete,
  } = req.body
  Task.create({
    taskName,
    dueDate,
    note,
    contactId,
    jobId,
    complete,
    userId: req.user.id,
  })
    .then((task) => {
      res.status(201).send(task)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const {
    taskName,
    dueDate,
    note,
    contactId,
    jobId,
    complete,
  } = req.body
  Task.update(
    {
      taskName,
      dueDate,
      note,
      contactId,
      jobId,
      complete,
    },
    {
      where: {
        userID: req.user.id,
        id: req.params.id,
      },
    },
  )
    .then((task) => {
      res.status(200).send(task)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  })
    .then(() => {
      req.sendStatus(204)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

module.exports = router

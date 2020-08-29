// ========== TASKS ROUTER ========== //
const express = require('express')
const router = express.Router()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Job, Task } = require('../schemas')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

router.get('/', rejectUnauthenticated, (req, res) => {
  Task.findAll({
    where: {
      [Op.or]: {
        jobUserId: Sequelize.where(Sequelize.col('Job.user_id'), {
          [Op.eq]: req.user.id,
        }),
        userId: req.user.id,
      },
    },
    include: [
      {
        required: false,
        model: Job,
        where: {
          userId: req.user.id,
        },
      },
    ],
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
  const { taskName, dueDate, note, contactId, jobId, complete } = req.body
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

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const task = await Task.findOne({
    attributes: ['id'],
    where: {
      id: req.params.id,
      [Op.or]: {
        jobUserId: Sequelize.where(Sequelize.col('Job.user_id'), {
          [Op.eq]: req.user.id,
        }),
        userId: req.user.id,
      },
    },
    include: [
      {
        required: false,
        model: Job,
        where: {
          userId: req.user.id,
        },
      },
    ],
  })

  if (!task) return res.sendStatus(403)

  const { taskName, dueDate, note, contactId, jobId, complete } = req.body
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

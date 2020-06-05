const express = require('express')
const router = express.Router()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Job, JobRequirement, Stage, Sequelize, Task } = require('../schemas')
const Op = Sequelize.Op

//-----GET for job pipeline table-------//
router.get('/', rejectUnauthenticated, (req, res) => {
  Job.findAll({
    attributes: ['id', 'companyName', 'position', 'closed'],
    where: {
      closed: false,
      userId: req.user.id,
    },
    include: [
      {
        model: Stage,
        attributes: ['id', 'stage', 'date', 'note'],
        where: {
          date: {
            [Op.gte]: Sequelize.fn('NOW'),
          },
        },
        limit: 2,
        order: [['date', 'ASC']],
      },
    ],
  })
    .then((jobs) => {
      res.send(jobs)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.get('/stages', rejectUnauthenticated, (req, res) => {
  Job.findAll({
    where: {
      userId: req.user.id,
    },
    include: [Stage],
  })
    .then((job) => {
      res.send(job)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.get('/tasks', rejectUnauthenticated, (req, res) => {
  Job.findAll({
    where: {
      userId: req.user.id,
    },
    include: [Task],
  })
    .then((job) => {
      res.send(job)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
  const {
    position,
    companyName,
    notes,
    postingUrl,
    deadline,
    compensation,
    benefits,
    travel,
  } = req.body

  Job.create({
    position,
    companyName,
    notes,
    postingUrl,
    deadline,
    compensation,
    benefits,
    travel,
    userId: req.user.id,
  })
    .then((job) => {
      res.send(job)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
  const {
    position,
    companyName,
    notes,
    postingUrl,
    deadline,
    compensation,
    benefits,
    travel,
    id,
  } = req.body

  Job.update(
    {
      position,
      companyName,
      notes,
      postingUrl,
      deadline,
      compensation,
      benefits,
      travel,
    },
    {
      where: {
        id,
        userId: req.user.id,
      },
    },
  )
    .then((job) => {
      res.send(job)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.put('/deactivate/:id', rejectUnauthenticated, (req, res) => {
  Job.update(
    {
      closed: true,
    },
    {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  )
    .then((job) => {
      res.send(job)
    })
    .catch((error) => {
      console.log(error)
    })
})

router.delete('/stages/:jobId', rejectUnauthenticated, (req, res) => {
  Stage.destroy({
    where: {
      jobId: req.params.jobId,
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

router.post('/stages', rejectUnauthenticated, (req, res) => {
  // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
  const {
    jobId,
    stage: [, { stage, note, date }],
  } = req.body
  Stage.create({
    stage,
    note,
    date,
    jobId,
  })
    .then((stage) => {
      res.send(stage)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.post('/stages/new', rejectUnauthenticated, (req, res) => {
  res.status(410).send({
    message:
      'This endpoint has been removed. Please switch to the main POST endpoint for this resource type',
  })
})

router.post('/tasks/new', rejectUnauthenticated, (req, res) => {
  res.status(410).send({
    message:
      'This endpoint has been removed. Please switch to the main POST endpoint for this resource type',
  })
})

router.post('/requirements', rejectUnauthenticated, (req, res) => {
  res.status(410).send({
    message:
      'This endpoint has been removed. Please switch to the main POST endpoint for this resource type',
  })
})

router.delete('/tasks/:id', rejectUnauthenticated, (req, res) => {
  Task.destroy({
    where: {
      jobId: req.params.id,
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

router.post('/tasks', (req, res) => {
  // req.body is an array, numbered key followed up actual stage object, so look at req.body.task[1]
  const {
    task: [, { taskName, dueDate, jobId, note }],
  } = req.body
  Task.create({
    taskName,
    dueDate,
    jobId,
    note,
  })
    .then((task) => {
      res.send(task)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(error)
    })
})

router.put('/requirements', (req, res) => {
  const [, { requirementOffer, requirementMet, id }] = req.body
  JobRequirement.update(
    {
      requirementOffer,
      requirementMet,
    },
    {
      where: {
        id,
        userId: req.user.id,
      },
    },
  )
})
module.exports = router

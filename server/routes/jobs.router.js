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
  Stage.findAll({
    include: [
      {
        model: Job,
        attributes: [],
        where: {
          userId: req.user.id,
          closed: false,
        },
      },
    ],
  })
    .then((stages) => {
      res.send(stages)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.get('/tasks', rejectUnauthenticated, (req, res) => {
  Task.findAll({
    include: [
      {
        model: Job,
        attributes: [],
        where: {
          userId: req.user.id,
          closed: false,
        },
      },
    ],
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
  const { jobId, stage, note, date } = req.body
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
  const { taskName, dueDate, jobId, note } = req.body
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

router.put('/requirements', async (req, res) => {
  const { requirementOffer, requirementMet, id } = req.body
  const job = await JobRequirement.findOne({
    attributes: [id],
    where: {
      id,
    },
    include: [
      {
        model: Job,
        where: {
          userId: req.user.id,
        },
      },
    ],
  })
  if (!job) return res.sendStatus(403)
  JobRequirement.update(
    {
      requirementOffer,
      requirementMet,
    },
    {
      where: {
        id,
      },
    },
  )
    .then((jobRequirement) => {
      res.send(jobRequirement)
    })
    .catch((error) => {
      console.error(error)
      res.sendStatus(error)
    })
})
module.exports = router

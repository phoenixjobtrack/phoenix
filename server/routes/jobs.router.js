const express = require('express')
const pool = require('../modules/pool')
const router = express.Router()
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const { Job, JobRequirement, Stage, Sequelize, Task } = require('../schemas')
const Op = Sequelize.Op

//-----GET for job pipeline table-------//
router.get('/', rejectUnauthenticated, (req, res) => {
  const stagesRelation = {
    model: Stage,
    attributes: ['id', 'stage', 'data', 'note'],
    where: {
      date: {
        [Op.gte]: Sequelize.fn('NOW'),
      },
    },
    limit: 1,
  }

  Job.findAll({
    attributes: ['id', 'companyName', 'position', 'deactivated'],
    where: {
      deactivated: false,
      userId: req.user.id,
    },
    include: [
      {
        as: 'currentStage',
        ...stagesRelation,
      },
      {
        as: 'nextStage',
        offset: 1,
        ...stagesRelation,
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
    company_name: companyName,
    notes,
    posting_url: postingUrl,
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
    company_name: companyName,
    notes,
    posting_url: postingUrl,
    deadline,
    compensation,
    benefits,
    travel,
    job_id: jobId,
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
        id: jobId,
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
      deactivated: true,
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

router.delete('/stages/:id', rejectUnauthenticated, (req, res) => {
  Job.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  })
})

router.post('/stages', rejectUnauthenticated, (req, res) => {
  // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
  const {
    job_id: jobId,
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
  res
    .status(410)
    .send({
      message:
        'This endpoint has been removed. Please switch to the main POST endpoint for this resource type',
    })
})

router.post('/tasks/new', rejectUnauthenticated, (req, res) => {
  res
    .status(410)
    .send({
      message:
        'This endpoint has been removed. Please switch to the main POST endpoint for this resource type',
    })
})

router.post('/requirements', rejectUnauthenticated, (req, res) => {
  res
    .status(410)
    .send({
      message:
        'This endpoint has been removed. Please switch to the main POST endpoint for this resource type',
    })
})

router.delete('/tasks/:id', rejectUnauthenticated, (req, res) => {
  let query = `DELETE FROM "tasks" WHERE job_id=$1`
  pool
    .query(query, [req.params.id])
    .then((response) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.sendStatus(500)
    })
  Job.destroy({
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
    task: [, { task_name: taskName, due_date: dueDate, job_id: jobId, note }],
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
  const [
    ,
    {
      requirement_offer: requirementOffer,
      requirement_met: requirementMet,
      id,
    },
  ] = req.body
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

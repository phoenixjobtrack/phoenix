const express = require('express')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const router = express.Router()
const { JobRequirement, Requirement } = require('../schemas')

//rejectUnauthenticated verifies user is logged in before displaying data

// // GET route
router.get('/', rejectUnauthenticated, (req, res) => {
  Requirement.findAll({
    attributes: ['requirement', 'userId'],
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: JobRequirement,
        attributes: [
          'id',
          'jobId',
          'requirementId',
          'requirementOffer',
          'requirementMet',
        ],
      },
    ],
  })
    .then((requirements) => {
      res.send(requirements)
    })
    .catch((error) => {
      console.log(error)
      res.send(500)
    })
})

// POST route
router.post('/', rejectUnauthenticated, (req, res) => {
  const {
    requirement_offer: requirementOffer,
    requirement_id: requirementId,
    requirement_met: requirementMet,
    job_id: jobId,
  } = req.body

  JobRequirement.create({
    requirementOffer,
    requirementId,
    requirementMet,
    jobId,
  })
    .then((jobRequirement) => {
      res.send(jobRequirement)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

module.exports = router

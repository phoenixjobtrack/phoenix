const express = require('express')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const router = express.Router()
const { JobRequirement, Requirement } = require('../schemas')

//rejectUnauthenticated verifies user is logged in before displaying data

// // GET route
router.get('/', rejectUnauthenticated, (req, res) => {
  JobRequirement.findAll({
    attributes: [
      'id',
      'jobId',
      'requirementId',
      'requirementOffer',
      'requirementMet',
    ],
    include: [
      {
        model: Requirement,
        attributes: ['requirement', 'userId'],
        where: {
          userId: req.user.id,
        },
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
  const { requirementOffer, requirementId, requirementMet, jobId } = req.body

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

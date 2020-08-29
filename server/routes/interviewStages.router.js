const express = require('express')
const router = express.Router()
const { InterviewStage } = require('../schemas')

router.get('/', (req, res) => {
  InterviewStage.findAll()
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

module.exports = router

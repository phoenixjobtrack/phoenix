const express = require('express');
const router = express.Router();
const { InterviewStage } = require('../schemas/interview-stage')

router.get('/', (req, res) => {
    InterviewStage.findAll().then(() => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
})

module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in /tasks router.get');
    let query = `SELECT * FROM "interview_stages";`;
    pool.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus
        })
})

module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let query = `SELECT * FROM "interview_stages";`;
    pool.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500)
        })
})

module.exports = router;
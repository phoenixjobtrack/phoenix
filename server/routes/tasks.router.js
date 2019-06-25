const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('in POST /api/tasks', req.body, req.user)
    const queryText = 'INSERT INTO "tasks" (user_id, task_name, due_date, ) VALUES ($1,$2)'
    pool.query(queryText, [req.body.requirement, req.user])
        .then(response => {
            console.log('in POST /api/requirement', response)
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('error in POST /api/requirement', err)
            res.sendStatus(500)
        })
});

module.exports = router;
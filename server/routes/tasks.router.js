const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in /tasks router.get');
    let query = `SELECT "id", 
    "user_id",
    "task_name",
    to_char("due_date", 'MM/DD/YYYY') AS "due_date", 
    "complete",
    "contact_id",
    "job_id",
    "disabled" FROM "tasks" WHERE "user_id"=$1;`;
    pool.query(query, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus
        })
})

router.post('/', (req, res) => {
    console.log('in POST /api/tasks', req.user.id, req.body)
    const queryText = `INSERT INTO "tasks" (user_id, task_name, due_date, contact_id, job_id) VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.user.id, req.body.task_name, req.body.due_date, req.body.contact_id, req.body.job_id])
    // const queryText = `INSERT INTO "tasks" ("task_name") VALUES ('Test Data');`;
    // pool.query(queryText)
        .then(response => {
            console.log('in POST /api/tasks', response)
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('error in POST /api/tasks', err)
            res.sendStatus(500)
        })
});

module.exports = router;
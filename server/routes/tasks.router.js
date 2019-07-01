// ========== TASKS ROUTER ========== //
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
    "note",
    "disabled" FROM "tasks" WHERE "user_id"=$1
    ORDER BY "id" DESC;`;
    pool.query(query, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus
        })
}); // End router.get/api/tasks/:id

router.post('/', (req, res) => {
    console.log('in POST /api/tasks', req.user.id, req.body)
    const queryText = `INSERT INTO "tasks" (user_id, task_name, due_date, contact_id, job_id) VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.user.id, req.body.task_name, req.body.due_date, req.body.contact_id, req.body.job_id])
        .then(response => {
            console.log('in POST /api/tasks', response)
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('error in POST /api/tasks', err)
            res.sendStatus(500)
        })
}); // End router.post/api/tasks/:id

router.put('/:id', (req, res) => {
    console.log('in PUT /api/tasks req.params.id', req.params.id);
    const queryText = `UPDATE "tasks" SET "complete" =NOT "complete" WHERE "id"=$1;`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            console.log('in PUT /api/tasks', response)
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('error in PUT /api/tasks', err)
            res.sendStatus(500)
        })
}); // End router.put/api/tasks/:id

router.put('/update/:task_name/:id', (req, res) => {
    const queryText = `UPDATE "tasks" SET "task_name" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [req.params.task_name, req.params.id])
        .then(response => {
            console.log('in PUT /api/tasks/update', response)
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('error in PUT /api/update/tasks', err)
            res.sendStatus(500)
        })
}); // End router.put/api/tasks/update/:id

router.delete('/:id', (req, res) => {
    console.log('in DELETE /api/tasks req.params.id', req.params.id);
    const queryText = `DELETE FROM "tasks" WHERE "id"=$1`;
    pool.query(queryText, [req.params.id])
        .then(() => {res.sendStatus(200);})
        .catch((err) => {
            console.log('Error completing DELETE task:', err)
        })
}); // End router.delete/api/tasks/:id

module.exports = router;
// ========== TASKS ROUTER ========== //
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
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
            res.sendStatus(500)
        })
}); // End router.get/api/tasks/:id

router.get('/date', rejectUnauthenticated, (req, res) => {
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
    ORDER BY "due_date";`;
    pool.query(query, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500)
        })
}); // End router.get/api/tasks/:id

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in POST /api/tasks', req.user.id, req.body)
    const queryText = `INSERT INTO "tasks" (user_id, task_name, due_date, note, contact_id, job_id, complete) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [req.user.id, req.body.task_name, req.body.due_date, req.body.note, req.body.contact_id, req.body.job_id, req.body.complete])
        .then(response => {
            console.log('in POST /api/tasks', response)
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('error in POST /api/tasks', err)
            res.sendStatus(500)
        })
}); // End router.post/api/tasks/:id

router.put('/:id', rejectUnauthenticated, (req, res) => {
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

// Adds Note To Task in Task View
router.put('/note/:note/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "tasks" SET "note"=$1 WHERE "tasks"."id"=$2;`;
    pool.query(queryText, [req.params.note, req.params.id])
        .then(response => {
            console.log('in PUT /api/tasks/note', response)
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('error in PUT /api/tasks/note', err)
            res.sendStatus(500)
        })
}); // End router.put/api/tasks/note

router.put('/update/:task_name/:id/:due_date', rejectUnauthenticated, (req, res) => {
    console.log('in PUT /api/tasks/update', req.body);
    
    const queryText = `UPDATE "tasks" SET "task_name" = $1, "due_date" = $2 WHERE "id" = $3;`;
    pool.query(queryText, [req.body.task_name, req.body.date, req.params.id])
        .then(response => {
            console.log('in PUT /api/tasks/update', response)
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('error in PUT /api/update/tasks', err)
            res.sendStatus(500)
        })
}); // End router.put/api/tasks/update/:id

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in DELETE /api/tasks req.params.id', req.params.id);
    const queryText = `DELETE FROM "tasks" WHERE "id"=$1`;
    pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error completing DELETE task:', err)
            res.sendStatus(500)
        })
}); // End router.delete/api/tasks/:id

module.exports = router;
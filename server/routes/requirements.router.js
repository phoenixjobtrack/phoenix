const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//rejectUnauthenticated verifies user is logged in before displaying data

// // GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "requirements" WHERE "user_id"=$1 ORDER BY "id" ASC;`
    pool.query(queryText,[req.user.id])
        .then(result=>{
            res.send(result.rows)
        })
        .catch(err=>{
            res.sendStatus(500)
        })
});


// POST route
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText='INSERT INTO "requirements" (requirement, user_id) VALUES ($1,$2)'
    pool.query(queryText, [req.body.requirement, req.user.id])
        .then(response=>{
            res.sendStatus(201)
        })
        .catch(err=>{
            res.sendStatus(500)
        })
});

//PUT route
router.put('/:id', (req,res)=>{
    const queryText ='UPDATE "requirements" SET "requirement"=$1 WHERE "id"=$2 AND "user_id"=$3;';
    pool.query(queryText, [req.body.requirement, req.params.id, req.user.id])
        .then(response=>{
            res.sendStatus(200);
        })
        .catch(err=>{
            console.log('error in PUT /api/requirements', err)
            res.sendStatus(500)
        })    
})

//DELETE route
router.delete('/:id', rejectUnauthenticated, (req,res)=>{
    console.log('in DELETE /api/requirements', req.params.id, req.user.id)
    const queryText='DELETE FROM "requirements" WHERE "id"=$1 AND "user_id"=$2'
    pool.query(queryText,[req.params.id, req.user.id])
        .then(response=>{
            res.sendStatus(200)
        })
        .catch(err=>{
            res.sendStatus(500)
        })
})

module.exports = router;
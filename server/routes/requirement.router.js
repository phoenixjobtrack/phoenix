const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET route
//rejectUnauthenticated verifies user is logged in before displaying data
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in GET /api/requirement. user:', req.user.id)
    const queryText = 'SELECT * FROM "requirements" WHERE "user_id"=$1'
    pool.query(queryText,[req.user.id])
        .then(result=>{
            console.log('back from GET /api/requirement', result.rows)
            res.send(result.rows)
        })
        .catch(err=>{
            console.log('error in GET /api/requirement', err)
            res.sendStatus(500)
        })
});


// POST route
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in POST /api/requirement', req.body, req.user.id)
    const queryText='INSERT INTO "requirements" (requirement, user_id) VALUES ($1,$2)'
    pool.query(queryText, [req.body.requirement, req.user.id])
        .then(response=>{
            console.log('in POST /api/requirement', response)
            res.sendStatus(201)
        })
        .catch(err=>{
            console.log('error in POST /api/requirement', err)
            res.sendStatus(500)
        })
});

//PUT route
router.put('/', rejectUnauthenticated, (req,res)=>{
    console.log('in PUT /api/requirement', req.body, req.user.id)
    const queryText='UPDATE "requirements" SET "requirement"=$1 WHERE "user_id"=$2 AND "id"=$3'
    pool.query(queryText,[req.body.requirement, req.user.id, req.body.id])
        .then(response=>{
            console.log('back from PUT /api/requirement', response)
            res.sendStatus(200);
        })
        .catch(err=>{
            console.log('error in PUT /api/requirement', err)
            res.sendStatus(500)
        })
    
})


module.exports = router;
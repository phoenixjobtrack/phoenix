const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//rejectUnauthenticated verifies user is logged in before displaying data



// // GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = 
        `
            SELECT  jr.id, jr.job_id, jr.requirement_id, jr.requirement_offer, jr.requirement_met, r.requirement, r.user_id 
            FROM "jobs_requirements" jr 
            JOIN "requirements" r 
            ON jr.requirement_id = r.id 
            WHERE r.user_id=$1;
        `
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
    const queryText ='INSERT INTO "jobs_requirements" (requirement_offer, job_id, requirement_id, requirement_met) VALUES ($1, (SELECT MAX(id) FROM jobs), $2, $3)'
    pool.query(queryText, [req.body.requirement_offer, req.body.requirement_id, req.body.requirement_met])
        .then(response=>{
            res.sendStatus(201)
        })
        .catch(err=>{
            res.sendStatus(500)
        })
});


module.exports = router;
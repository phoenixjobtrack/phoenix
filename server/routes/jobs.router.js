const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//-----GET for job pipeline table-------//
router.get('/', (req,res) => {
    console.log('this is for job', req.user.id);
    let query = `SELECT jobs.company_name, jobs.position, stages.stage, 
    stages.date, stages.note FROM "jobs"  JOIN "stages" ON 
    jobs.id = stages.job_id WHERE "user_id"=$1;`
    pool.query(query,[req.user.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        })
}
)

router.post('/', (req, res) => {
    console.log('in POST /api/jobs', req.user.id, req.body)
    const queryText = `INSERT INTO "jobs" (user_id, position, company_name, notes, posting_url, deadline,
        compensation, benefits, travel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    pool.query(queryText, [req.user.id, req.body.position, req.body.company_name, req.body.notes, req.body.posting_url,
        req.body.deadline, req.body.compensation, req.body.benefits, req.body.travel ])
        .then(response => {
            console.log('in POST /api/jobs', response)
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('error in POST /api/jobs', err)
            res.sendStatus(500)
        })
}); // End router.post/api/tasks/:id

module.exports = router;
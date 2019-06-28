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

module.exports = router;
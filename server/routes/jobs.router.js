const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//-----GET for job pipeline table-------//
router.get('/stages', (req,res)=>{
    let query = `SELECT j.id as job_id, j.user_id as job_user_id, j.position, j.company_name, j.notes as job_notes, j.posting_url, j.deadline, j.compensation, j.benefits, j.travel,
        s.id as stage_id, s.stage, s.note as stage_note, s.date as stage_date
    FROM "jobs" j JOIN "stages" s ON j.id = s.job_id
    WHERE j.user_id = $1;`
    pool.query(query, [req.user.id])
        .then((result) => {
            console.log('in GET /api/jobs/stages', result.rows, req.user.id)
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        }) 
})

router.get('/tasks', (req,res)=>{
    let query = `SELECT
        j.id as job_id, j.user_id as job_user_id, j.position, j.company_name, j.notes as job_notes, j.posting_url, j.deadline, j.compensation, j.benefits, j.travel,
        t.id as task_id, t.user_id as task_user_id, t.task_name, t.due_date as task_due_date, t.complete, t.contact_id as task_contact_id, t.note as task_note
    FROM "jobs" j JOIN "tasks" t on j.id = t.job_id
    WHERE j.user_id = $1;`
    pool.query(query,[req.user.id])
        .then((result)=>{
            console.log('in GET /api/jobs/tasks', result.rows, req.user.id)
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log('error in /api/jobs/tasks', error)
            res.sendStatus(500);
        })
})


router.get('/', (req,res) => {
    console.log('this is for job', req.user.id);
    
    // let query = `
    //     SELECT j1.company_name, j1.position, currentstage.stage as stage, nextstage.stage as nextstage, nextstage.date, nextstage.note 
    //     FROM "jobs" j1 
    //     LEFT JOIN "stages" currentstage 
    //     ON (j1.id = currentstage.job_id AND currentstage.date <= now()) 
    //     LEFT JOIN (
    //         select ordered_stages.id,ordered_stages.job_id,ordered_stages.stage,
    //         ordered_stages.note,ordered_stages.date,ordered_stages.row_num 
    //         from (select ss.id,ss.job_id,ss.stage,ss.note,ss.date, row_number() 
    //         over (
    //             partition by ss.job_id
    //             order by date asc
    //         ) as row_num
    //         from "stages" ss where ss.date >= now()
    //     ) as ordered_stages
    //     where ordered_stages.row_num = 1) as nextstage ON (j1.id = nextstage.job_id)  WHERE "user_id"=64 order by nextstage.date asc;`
    
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
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//-----GET for job pipeline table-------//
router.get('/', rejectUnauthenticated, async (req, res) => {

    getResults(req.user.id).then(results => {
        // process results here
        res.send(results);
    }).catch(err => {
        // process error here
        res.sendStatus(500);
    });

})

async function getResults(id0) {
    const client = await pool.connect();
    let results = [];
    let table_1_data = await client.query(`SELECT job.id ,job.company_name, job.position, job.deactivated FROM jobs job WHERE job.deactivated=FALSE AND user_id=` + id0);
    for (let table_1_row of table_1_data.rows) {
        let repObj = {
            job_id: table_1_row.id,
            company_name: table_1_row.company_name,
            position: table_1_row.position,
            deactivated: table_1_row.deactivated,
            currentStageId: '',
            currentStageDate: '',
            currentStageNote: '',
            currentStage: '',
            nextStageId: '',
            nextStageDate: '',
            nextStageNote: '',
            nextstage: '',

        };

        let table_2_data = await client.query(`select currentstage.id, currentstage.stage, currentstage.date, currentstage.note from stages currentstage where job_id = ` + table_1_row.id + ` and currentstage.date >= now() order by currentstage.date asc limit 1`);
        for (let table_2_row of table_2_data.rows) {
            repObj.currentStageId = table_2_row.id;
            repObj.currentStageDate = table_2_row.date;
            repObj.currentStageNote = table_2_row.note;
            repObj.currentStage = table_2_row.stage;
            

        }
        let table_3_data = await client.query(`select currentstage.id, currentstage.stage, currentstage.date,currentstage.note from stages currentstage where job_id = ` + table_1_row.id + ` and currentstage.date >= now() order by currentstage.date asc limit 2`);
        for (let table_3_row of table_3_data.rows) {
            repObj.nextStageId = table_3_row.id;
            repObj.nextStageDate = table_3_row.date;
            repObj.nextStageNote = table_3_row.note;
            repObj.nextstage = table_3_row.stage;

        }
        results.push(repObj);
    }
    client.release()
    return results;
}

router.get('/stages', rejectUnauthenticated, (req,res)=>{
    let query = `SELECT j.id as job_id, j.user_id as job_user_id, j.position, j.company_name, j.notes as job_notes, j.posting_url, j.deadline, j.compensation, j.benefits, j.travel,
        s.id as stage_id, s.stage, s.note as stage_note, s.date as stage_date
    FROM "jobs" j FULL OUTER JOIN "stages" s ON j.id = s.job_id
    WHERE j.user_id = $1;`
    pool.query(query, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            res.sendStatus(500);
        }) 
})

router.get('/tasks', rejectUnauthenticated, (req, res) => {
    let query =
        `SELECT
        j.id as job_id, j.user_id as job_user_id, j.position, j.company_name, j.notes as job_notes, j.posting_url, j.deadline, j.compensation, j.benefits, j.travel,
        t.id as task_id, t.user_id as task_user_id, t.task_name, t.due_date as task_due_date, t.complete, t.contact_id as task_contact_id, t.note as task_note
    FROM "jobs" j JOIN "tasks" t on j.id = t.job_id
    WHERE j.user_id = $1;`

    pool.query(query, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

router.get('/', rejectUnauthenticated, async (req,res) => {
    getResults(req.user.id).then(results => {
        // process results here
        res.send(results);
    }).catch(err => {
        // process error here
        res.sendStatus(500);
    });
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "jobs" (user_id, position, company_name, notes, posting_url, deadline,
        compensation, benefits, travel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    pool.query(queryText, [req.user.id, req.body.position, req.body.company_name, req.body.notes, req.body.posting_url,
        req.body.deadline, req.body.compensation, req.body.benefits, req.body.travel ])
        .then(response => {
            res.sendStatus(201)
        })
        .catch(err => {
            res.sendStatus(500)
        })
}); // End router.post/api/tasks/:id

router.put('/', rejectUnauthenticated, (req,res)=>{
    const query = `
        UPDATE "jobs" 
        SET position = $1, 
        company_name=$2, 
        notes=$3, 
        posting_url=$4, 
        deadline=$5, 
        compensation=$6, 
        benefits=$7, 
        travel=$8 
        WHERE id=$9
    `
    pool.query(query,[
        req.body.position, 
        req.body.company_name, 
        req.body.job_notes, 
        req.body.posting_url, 
        req.body.deadline, 
        req.body.compensation, 
        req.body.benefits, 
        req.body.travel, 
        req.body.job_id
    ])
    .then(response=>{
        res.sendStatus(200) 
    })
    .catch(err=>{
        res.sendStatus(500)
    })
})

router.put('/deactivate/:id', rejectUnauthenticated, (req,res)=>{
    const query = `UPDATE "jobs" SET deactivated=true WHERE id=$1`
    pool.query(query,[req.params.id])
    .then(response=>{
        console.log('in PUT /api/job/deactivate', response);
        res.sendStatus(200)
    })
    .catch(err=>{
        console.log('error in PUT /api/job/deactivate', err)
        res.sendStatus(500)
    })
})

router.delete('/stages/:id', rejectUnauthenticated, (req,res)=>{
    let query = `DELETE FROM "stages" WHERE job_id=$1`
    pool.query(query, [req.params.id])
    .then(response=>{
        res.sendStatus(200)
    })
    .catch(err=>{
        res.sendStatus(500)
    })
})

router.post('/stages', rejectUnauthenticated, (req,res)=>{
    // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
    let query = `INSERT INTO "stages" (job_id, stage, note, date) VALUES ($1, $2, $3, $4)`
    pool.query(query, [req.body.job_id, req.body.stage[1].stage, req.body.stage[1].note, req.body.stage[1].date])
    .then(response=>{
        res.sendStatus(201)
    })
    .catch(err=>{
        res.sendStatus(500)
    })
})

router.post('/stages/new', rejectUnauthenticated, (req,res)=>{
    // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
    let query = `INSERT INTO "stages" (job_id, stage, note, date) VALUES ((SELECT MAX(id) FROM jobs),$1,$2,$3);`
    pool.query(query, [req.body.stage, req.body.note, req.body.date])
    .then(response=>{
        res.sendStatus(201)
    })
    .catch(err=>{
        res.sendStatus(500)
    })
})

router.post('/tasks/new', rejectUnauthenticated, (req, res) => {
    // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
    let query = `INSERT INTO "tasks" (user_id, task_name, due_date, job_id, note) VALUES ($1, $2, $3, (SELECT MAX(id) FROM jobs),$4);`
    pool.query(query, [req.user.id, req.body.task_name, req.body.due_date, req.body.note])
        .then(response => {
            res.sendStatus(201)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})


router.post('/requirements', rejectUnauthenticated, (req, res) => {
    // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
    let query = `INSERT INTO "jobs_requirements" (job_id, requirement_id, due_date, requirement_offer, requirement_met) VALUES ((SELECT MAX(id) FROM jobs), $1, $2, $3, $4);`
    pool.query(query, [])
        .then(response => {
            res.sendStatus(201)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

router.delete('/tasks/:id',rejectUnauthenticated, (req,res)=>{
    let query = `DELETE FROM "tasks" WHERE job_id=$1`
    pool.query(query, [req.params.id])
        .then(response => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

router.post('/tasks', (req, res) => {
    // req.body is an array, numbered key followed up actual stage object, so look at req.body.stage[1]
    let query = `INSERT INTO "tasks" (user_id, task_name, due_date, job_id, note ) VALUES ($1, $2, $3, $4, $5)`
    pool.query(query, [req.user.id, req.body.task[1].task_name, req.body.task[1].due_date, req.body.job_id, req.body.task[1].note])
        .then(response => {
            res.sendStatus(201)
        })
        .catch(err => {
            res.sendStatus(500)
        })
})

router.put('/requirements', (req, res) => {
    let query = `UPDATE "jobs_requirements" SET requirement_offer = $1, requirement_met = $2 WHERE id = $3`
    pool.query(query, [req.body[1].requirement_offer, req.body[1].requirement_met, req.body[1].id])
    .then(response=>{
        res.sendStatus(200)
    })
    .catch(err=>{
        res.sendStatus(500)
        
    })
})
module.exports = router;
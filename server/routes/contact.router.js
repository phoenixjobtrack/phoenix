const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('in GET /api/contact',req.user.id);
    let query = `SELECT * FROM "contacts"
    WHERE "user_id" = $1 `;
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

//route to get selected contact only
router.get('/current/:id', (req,res)=>{
    console.log('in GET /api/contact/current', req.params.id)
    let query = `SELECT * FROM "contacts" WHERE "user_id" = $1 AND "id"=$2`
    pool.query(query,[req.user.id,req.params.id])
        .then(result=>{
            res.send(result.rows)
        })
        .catch(err=>{
            console.log('error in GET /api/contact/current', err)
            res.sendStatus(500)
        })
})

router.post('/', (req, res) => {
    console.log('in POST /api/contact', req.user.id, req.body)
    const queryText = `INSERT INTO "contacts" (user_id, first_name, last_name, company, position, email, linkedin_url, cell, phone, notes ) VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.body.user_id, req.body.first_name, req.body.last_name, req.body.company, req.body.position, req.body.email, req.body.linkedin_url,
    req.body.cell, req.body.phone, req.body.notes])
        .then(response => {
            console.log('in POST /api/contact', response)
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('error in POST /api/contact', err)
            res.sendStatus(500)
        })
});

router.put('/:id', (req,res)=>{
    console.log('in PUT /api/contact', req.params.id, req.body)
    const queryText = 
        `
            UPDATE "contacts" 
            SET first_name = $1, 
            last_name = $2, 
            company = $3, 
            position = $4, 
            email = $5, 
            linkedin_url = $6, 
            cell = $7, 
            phone = $8, 
            notes = $9 
            WHERE id = $10;
        `
    pool.query(queryText,
                [
                    req.body.first_name, 
                    req.body.last_name, 
                    req.body.company, 
                    req.body.position, 
                    req.body.email, 
                    req.body.linkedin_url, 
                    req.body.cell, 
                    req.body.phone, 
                    req.body.notes, 
                    req.params.id
                ])
        .then(response=>{
            console.log('in PUT /api/contact', response)
            res.sendStatus(200)
        })
        .catch(err=>{
            console.log('error in PUT /api/contact', err)
            res.sendStatus(500)
        })
})




module.exports = router;
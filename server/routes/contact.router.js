const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req,res) => {
    let query = `SELECT * FROM "contacts"
    WHERE "user_id" = $1 `;
    pool.query(query,[req.user.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            res.sendStatus(500);
        })
}
)

//route to get selected contact only
router.get('/current/:id', rejectUnauthenticated, (req,res)=>{
    let query = `SELECT * FROM "contacts" WHERE "user_id" = $1 AND "id"=$2`
    pool.query(query,[req.user.id,req.params.id])
        .then(result=>{
            res.send(result.rows)
        })
        .catch(err=>{
            res.sendStatus(500)
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "contacts" (user_id, first_name, last_name, company, position, email, linkedin_url, cell, phone, notes ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    pool.query(queryText, [req.user.id, req.body.first_name, req.body.last_name, req.body.company, req.body.position, req.body.email, req.body.linkedin_url,
    req.body.cell, req.body.phone, req.body.notes])
        .then(response => {
            res.sendStatus(201)
        })
        .catch(err => {
            res.sendStatus(500)
        })
});

router.put('/:id', rejectUnauthenticated, (req,res)=>{
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
            res.sendStatus(200)
        })
        .catch(err=>{
            res.sendStatus(500)
        })
})

module.exports = router;
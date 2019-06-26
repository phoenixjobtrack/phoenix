const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    console.log(req.user.id);
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

router.post('/', (req, res) => {
    console.log('in POST /api/contact', req.user.id, req.body)
    const queryText = `INSERT INTO "contacts" (user_id, first_name, last_name, company, position, email, linkedin_url, cell, phone, notes ) VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.user.id, req.body.first_name, req.body.last_name, req.body.company, req.body.position, req.body.email, req.body.linkedin_url,
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




module.exports = router;
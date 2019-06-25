const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in POST /api/requirement', req.body, req.user.id)
    const queryText='INSERT INTO "requirements" (requirement, user_id) VALUES ($1,$2)'
    pool.query(queryText, [req.body.requirement, req.user.id])
        .then(response=>{
            console.log('in POST /api/requirement', response)
            res.sendStatus(200)
        })
        .catch(err=>{
            console.log('error in POST /api/requirement', err)
            res.sendStatus(500)
        })
});

module.exports = router;
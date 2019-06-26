const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    console.log(req.user.id);
    let query = `SELECT * FROM "jobs"
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

module.exports = router;
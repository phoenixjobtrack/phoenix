const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM "contacts"
    WHERE id = $1 `;
    pool.query(query,[req.params.id])
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
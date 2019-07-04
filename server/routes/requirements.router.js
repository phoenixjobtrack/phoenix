const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//rejectUnauthenticated verifies user is logged in before displaying data



// // GET route
router.get('/', (req, res) => {
    console.log('in GET /api/requirements user:', req.user.id)
    const queryText = `SELECT * FROM "requirements" WHERE "user_id"=$1 ORDER BY "id" ASC;`
    pool.query(queryText,[req.user.id])
        .then(result=>{
            console.log('back from GET /api/requirements', result.rows)
            res.send(result.rows)
        })
        .catch(err=>{
            console.log('error in GET /api/requirements', err)
            res.sendStatus(500)
        })
});


// POST route
router.post('/', (req, res) => {
    console.log('in POST /api/requirements', req.body, req.user.id)
    const queryText='INSERT INTO "requirements" (requirement, user_id) VALUES ($1,$2)'
    pool.query(queryText, [req.body.requirement, req.user.id])
        .then(response=>{
            console.log('in POST /api/requirements', response)
            res.sendStatus(201)
        })
        .catch(err=>{
            console.log('error in POST /api/requirements', err)
            res.sendStatus(500)
        })
});

//PUT route
router.put('/', (req,res)=>{
    console.log('in PUT /api/requirements', req.body, req.user.id)
    const queryText='UPDATE "requirements" SET "requirement"=$1 WHERE "user_id"=$2 AND "id"=$3'
    pool.query(queryText,[req.body.requirement, req.user.id, req.body.id])
        .then(response=>{
            console.log('back from PUT /api/requirements', response)
            res.sendStatus(200);
        })
        .catch(err=>{
            console.log('error in PUT /api/requirements', err)
            res.sendStatus(500)
        })    
})

// //DELETE route
// router.delete('/', rejectUnauthenticated, (req,res)=>{
//     console.log('in DELETE /api/requirements', req.body, req.user.id)
//     const queryText='DELETE FROM "requirements" WHERE "user_id"=$1 AND "id"=$2'
//     pool.query(queryText,[req.user.id,req.query.id])
//         .then(response=>{
//             console.log('in DELETE /api/requirements', response)
//             res.sendStatus(200)
//         })
//         .catch(err=>{
//             console.log('error in DELETE /api/requirements', err)
//             res.sendStatus(500)
//         })
// })


module.exports = router;
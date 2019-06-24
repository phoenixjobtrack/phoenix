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
    console.log('in POST /api/requirement', req.body, req.user)
    const queryText='INSERT INTO "requirements" (requirement, user_id) VALUES ($1,$2)'
    pool.query
});

module.exports = router;
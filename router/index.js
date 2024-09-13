const express = require('express');
const router = express.Router();
const endpoits = require('../controller/index')

//define api rourrter
router.get('/getCakes', endpoits.getCakes);


module.exports = router;


const express = require('express');
const router = express.Router();
const endpoits = require('../controller/main')

//define api rourte

//get all cake and get cake by id
router.get('/getCakes', endpoits.getCakes);
router.get('/cake/:id',endpoits.getCake);

// Sign-up route
router.post('/signup', endpoits.signUp);

// Login route
router.post('/login', endpoits.login);
router.post('/signup',endpoits.signUp);


module.exports = router;


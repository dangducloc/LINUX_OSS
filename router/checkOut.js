const express = require('express');
const router = express.Router();
const endpoits = require('../controller/checkOut');

router.post("/checkOut",endpoits.checkOut);

module.exports = router
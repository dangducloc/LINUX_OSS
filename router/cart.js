const express = require('express');
const router = express.Router();
const endpoits = require('../controller/cart');

router.post('/cart', endpoits.addcart);

module.exports = router
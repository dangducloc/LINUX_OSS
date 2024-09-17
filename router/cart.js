const express = require('express');
const router = express.Router();
const endpoits = require('../controller/cart');

router.get("/cart",endpoits.getCart);
router.post('/cart/addItem', endpoits.addItem);
router.put('/cart/updateItem', endpoits.updateItem);
router.delete('/cart/deleteItem',endpoits.deleteItem);

module.exports = router
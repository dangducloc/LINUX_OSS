const express = require('express');
const router = express.Router();
const endpoits = require('../controller/comments');

router.get("/comments/:idfood",endpoits.getComments);
router.post('/comments/postComment', endpoits.postComment);
// router.put('/cart/updateItem', endpoits.updateItem);
// router.delete('/cart/deleteItem',endpoits.deleteItem);

module.exports = router
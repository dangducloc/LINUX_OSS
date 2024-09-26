const express = require('express');
const router = express.Router();
const endpoits = require('../controller/comments');

router.get("/comments/:idfood",endpoits.getComments);
router.post('/comments/postComment', endpoits.postComment);
router.delete('/comments/deleteComment',endpoits.deleteComment);

module.exports = router
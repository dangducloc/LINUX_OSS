const express = require('express');
const router = express.Router();
const endpoits = require('../controller/comments');

//get comment via idfood
/**
 * @swagger
 * /api/comments/{idfood}:
 *   get:
 *     summary: Get comments for a food item
 *     description: Retrieve all comments for a specific food item.
 *     parameters:
 *       - name: idfood
 *         in: path
 *         required: true
 *         description: ID of the food item to get comments for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved comments.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error fetching comments.
 */
router.get("/comments/:idfood",endpoits.getComments);

//post a comment
/**
 * @swagger
 * /api/comments/postComment:
 *   post:
 *     summary: Post a comment for a food item
 *     description: Add a comment for a specific food item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idfood:
 *                 type: integer
 *                 description: ID of the food item to comment on.
 *               commentText:
 *                 type: string
 *                 description: The content of the comment.
 *             required:
 *               - idfood
 *               - commentText
 *     responses:
 *       201:
 *         description: Comment posted successfully.
 *       401:
 *         description: Unauthorized access or invalid cookie.
 *       500:
 *         description: Error posting comment.
 */ 
router.post('/comments/postComment', endpoits.postComment);

//detele a comment
/**
 * @swagger
 * /api/comments/deleteComment:
 *   delete:
 *     summary: Delete a comment (Admin only)
 *     description: Delete a comment by ID (Only accessible to admin users).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBL:
 *                 type: integer
 *                 description: ID of the comment to delete.
 *             required:
 *               - idBL
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       401:
 *         description: Unauthorized access or invalid role.
 *       500:
 *         description: Error deleting comment.
 */
router.delete('/comments/deleteComment',endpoits.deleteComment);

module.exports = router
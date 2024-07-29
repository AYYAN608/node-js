const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Ensure the path and filename are correct

// Add Comment
router.post('/', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
});

// Get Comments for Item
router.get('/:itemId', async (req, res) => {
    const comments = await Comment.find({ itemId: req.params.itemId });
    res.json(comments);
});

module.exports = router;

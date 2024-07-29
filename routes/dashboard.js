const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Ensure the path and filename are correct

router.get('/', async (req, res) => {
    const itemCount = await Item.countDocuments();
    res.json({ itemCount });
});

module.exports = router;


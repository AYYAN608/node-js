
const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Ensure the path and filename are correct

// Create Item
router.post('/', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
});

// Read Items
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Read Single Item
router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// Update Item
router.put('/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// Delete Item
router.delete('/:id', async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
});

module.exports = router;

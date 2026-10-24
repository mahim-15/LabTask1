const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories
router.get('/', async (req, res) => {
  const cats = await Category.find({});
  res.json(cats);
});

module.exports = router;

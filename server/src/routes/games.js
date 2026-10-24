const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET /api/games?search=&category=&page=&limit=&sort=popular|new
router.get('/', async (req, res) => {
  const { search, category, page = 1, limit = 12, sort } = req.query;
  const filter = {};
  if (search) filter.title = new RegExp(search, 'i');
  if (category) filter.category = category;
  let query = Game.find(filter);
  if (sort === 'popular') query = query.sort({ plays: -1 });
  else if (sort === 'new') query = query.sort({ _id: -1 });
  const games = await query.skip((page - 1) * limit).limit(Number(limit));
  res.json(games);
});

// GET /api/games/:slug
router.get('/:slug', async (req, res) => {
  const game = await Game.findOne({ slug: req.params.slug });
  if (!game) return res.status(404).json({ message: 'Game not found' });
  res.json(game);
});

// POST /api/games/:id/play – increment play count
router.post('/:id/play', async (req, res) => {
  const game = await Game.findByIdAndUpdate(
    req.params.id,
    { $inc: { plays: 1 } },
    { new: true }
  );
  if (!game) return res.status(404).json({ message: 'Game not found' });
  res.json({ plays: game.plays });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await ContactMessage.create({ name, email, message });
    res.json({ message: 'Thanks for contacting us!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { faqs } = require('../models/faq');

router.get('/', (req, res) => {
  res.render('admin', { faqs });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Show the create recipe page
router.get('/new', (req, res) => {
  res.render('recipes/new', {
    title: 'Create Recipe'
  });
});

module.exports = router;

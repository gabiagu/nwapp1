var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/game', function(req, res, next) {
  res.render('game', { title: 'game' });
});

module.exports = router;

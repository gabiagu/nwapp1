var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/game', function(req, res, next) {
  res.render('game', { title: 'game', start_data: start_data });
});

module.exports = router;

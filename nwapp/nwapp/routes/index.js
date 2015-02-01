var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home NeueWordle', page_title: 'index' });
});

/* GET users listing. */
router.get('/game', function(req, res, next) {
  res.render('game', { title: 'Game NeueWordle', page_title: 'game_screen' });
});

module.exports = router;

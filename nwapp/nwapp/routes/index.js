var express = require('express');
var router = express.Router();
var generator = require('../w_generator.js');
var start_data = generator.exported_words();
var generator2 = require('../w_generator2.js');
var start_data2 = generator2.exported_words();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home NeueWordle', page_title: 'index' });
});

/* GET users listing. */
router.get('/game', function(req, res, next) {
  res.render('game', { title: 'Game NeueWordle', page_title: 'game_screen', start_data: start_data2 });
});



module.exports = router;

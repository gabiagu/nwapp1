var express = require('express');
var router = express.Router();
var generator = require('../w_generator.js');
var start_data = generator.exported_words();
/* GET users listing. */
router.get('/game', function(req, res, next) {
  var start_data = generator.exported_words();
  console.log(start_data);
  res.render('game', { title: 'game', start_data: start_data });
});

module.exports = router;

var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var game = require('./routes/game');
var generator = require('./w_generator.js');
var start_data = generator.exported_words();
var generator2 = require('./w_generator2.js');
var start_data2 = generator2.exported_words();
//console.log('appjs log '+start_data.length);
//console.log(typeof generated_words.exported_words);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/game', game);

app.get('/getGameWords', function (req, res, next) {
  var start_data2 = generator2.exported_words();
  setTimeout(function() {
    res.send({data: start_data2});
   // console.log('indexjs log '+start_data.length);
   // res.writeHead(200, {'content-type': 'text/json' });
   // res.write( JSON.stringify({ data : start_data}) );
   // res.end('\n');
  }, 100);
  
  /*res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify({ data : start_data}) );
  res.end('\n');*/
  //res.send({data: start_data});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Oh, dear.');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

var express = require('express');
var connect = require('connect');
var diary = require('./models/diary');

var app = express();

app.disable('x-powered-by');
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// view engine setup
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
  layoutsDir   : __dirname + '/views/layouts',
  partialsDir  : __dirname + '/views/partials',
  defaultLayout: 'main',
  helpers: {
    uri: function(venue, string) {
      var moment = require('moment-timezone');
      var f = moment.tz(string, 'Japan').format('YYYYMMDD/HHmm');
      return ['http://example.com/event', venue, f].join('/');
    }
  }
});
app.engine('handlebars', hbs.engine);

// var favicon = require('serve-favicon');
// app.use(favicon('./app/public/favicon.ico'));

var morgan = require('morgan');
switch (app.get('env')) {
case 'development':
  app.use(morgan('dev'));
  break;
case 'production':
  app.use(morgan('tiny'));
  break;
}

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(__dirname + '/build'));
app.use(function(req, res, next) {
  res.locals.testing = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', function(req, res) {
  // set the timezone GMT+09:00
  var time = Date.now() + 32400000 - 14400000;
  var date = new Date(time).toISOString().slice(0, 10);
  diary.findByDate(date, function(err, result) {
    res.render('home', {
      title: japaneseDate(time) + 'の落し噺',
      nav: ['新宿', '池袋', '浅草', '上野'],
      programme: result
    });
  });
});

if (app.get('env') !== 'production') {
  app.get('/fail', function(req, res) {
    throw new Error();
  });
}

var api = require('./routes/api');
app.use(api);

// 404
app.use(function(req, res, next) {
  var err = new Error('The page you were looking for doesn\'t exist.');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    layout: null,
    message: err.message || 'We\'re sorry, but something went wrong.',
    status: err.status || 500
  });
});

module.exports = app;

function japaneseDate(timestamp) {
  var date = new Date(timestamp);
  var m = ['睦月','如月','弥生','卯月','皐月','水無月','文月','葉月','長月','神無月','霜月','師走'];
  var d = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十','三十一'];
  return m[Number(date.getMonth())] + d[Number(date.getDate())-1] + '日';
}

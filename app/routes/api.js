var express = require('express');
var connect = require('connect');
var event = require('../models/event');

var router = express.Router();

// adds connect-rest middleware to connect, silencing winston
var rest = require('connect-rest');
router.use(rest.rester({
  context: '/api',
  logger: new (require('winston').Logger)()
}));

rest.get('/event/:venue/:date/:time', function(req, content, cb) {
  var venue = decodeURI(req.params.venue);
  if (!(verify(venue) > -1)) {
    var err = new Error('Internal error.');
    err.statusCode = 200;
    return cb(err);
  }
  var date = req.params.date;
  var time = req.params.time;
  var filename = venue + '/' + date + time + '.json';
  event.findByName(filename, function(err, result) {
    cb(null, result);
  });
});

module.exports = router;

// console.log(true === verify('新宿末広亭') > -1);
function verify(venue) {
  return [
    '新宿末広亭',
    '池袋演芸場',
    '浅草演芸ホール',
    '鈴本演芸場'
  ].indexOf(venue);
}

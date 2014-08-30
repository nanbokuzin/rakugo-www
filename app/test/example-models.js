var calendar = require('../models/calendar');

calendar.listing('2014-09-01', function (err, result) {
  console.log(result);
});

calendar.program('新宿末広亭/201409011200', function(err, result) {
  console.log(result);
});

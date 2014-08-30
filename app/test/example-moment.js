var moment = require('moment-timezone');

var f = moment.tz('1979-12-31T00:00:00+09:00', 'Japan').format('YYYY/MM/DD/HHmm');
console.log(f === '1979/12/31/0000');

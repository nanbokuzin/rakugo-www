var fs = require('fs');
var path = require('path');

function Event() {
  var dataDir = __dirname + '/../../data';
  return {
    findByName: findByName
  };

  function findByName(name, cb) {
    fs.readFile(path.join(dataDir, name), function(err, buf) {
      if (err) {
        return cb('Internal error.');
      }
      var json = JSON.parse(buf).programme;
      cb(null, json);
    });
  }
}

var event = new Event();
module.exports = event;

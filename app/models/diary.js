var fs = require('fs');
var path = require('path');
var Q = require('q');

function Diary() {
  var dataDir = __dirname + '/../../data';
  return {
    findByDate: findByDate
  };

  function asyncReadFile(fileList, cb) {
    var promises = [];
    var statuses = [];
    fileList.forEach(function(file) {
      var deferred = Q.defer();
      fs.readFile(file, function(err, buf) {
        if (err) {
          return cb({error: 'Internal error.'});
        }
        var json = deleteProperty(JSON.parse(buf), 'programme');
        statuses.push(json);
        deferred.resolve();
      });
      promises.push(deferred.promise);
    });
    Q.all(promises).then(function() {
      cb(null, statuses);
    });
  }

  function deleteProperty(object, key) {
    delete object[key];
    return object;
  }

  function findByDate(date, cb) {
    var finder = require('findit')(dataDir, {fs: fs});
    var treasure = [];
    var pattern = makeRegex(date);
    finder.on('file', function (file, stat) {
      if (!isJSON(file) || !pattern.test(path.basename(file))) {
        return;
      }
      treasure.push(file);
    });
    finder.on('end', function() {
      asyncReadFile(treasure, function(err, statuses) {
        cb(err, statuses);
      });
    });
  }

  function isJSON(name) {
    return path.extname(name) === '.json' ? true : false;
  }

  function makeRegex(string) {
    return new RegExp('^' + string.split('-').join(''));
  }
}

var diary = new Diary();
module.exports = diary;

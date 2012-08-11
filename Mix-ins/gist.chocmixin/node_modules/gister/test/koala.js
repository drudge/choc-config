var test = require('./index-test.js');

function run(cb) {
  test.gister.run({}, function (results) {
    cb(results.broken || results.errored);
  });
}

module.exports = run;

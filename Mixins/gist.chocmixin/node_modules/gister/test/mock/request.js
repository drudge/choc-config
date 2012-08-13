var response = require('./response');

function request(opts, cb) {
  opts.method = opts.method || "GET";

  if (cb) {
    cb(null, {
      statusCode: opts.method === 'POST' ? 201 : 200,
      headers: {
        location: "https://gist.github.com/1"
      }
    }, response[opts.method.toLowerCase()]);
  }
}

module.exports = request;

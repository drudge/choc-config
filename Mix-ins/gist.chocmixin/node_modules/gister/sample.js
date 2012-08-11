var Stream = require('stream')
var Gist = require('./gister')

/*
var mystream = new Stream()
mystream.writable = true
mystream.write = function (data) {
  console.log('|', data.toString())
}
mystream.end = function () {
}
*/

var gist = new Gist({ token: 'secret' })

gist.on('error', function (msg, body, res) {
  console.error(msg)
  console.error(body)
  console.error(res)
  throw msg
})

// retrieving gist
gist.on('gist', function (data) {
  console.log('@', data)
})
//gist.get(1)
// /retrieving gist


// creating
gist.on('created', function (data) {
  console.log('!', data)
})
//gist.create({ 'myfile.txt': 'hello world' })
// /creating

// editing
gist.on('edited', function (data) {
  console.log('edited >> ', data)
})
//gist.edit({ 'myfile.txt': 'hello world3' }, 2580588)
// /editing


// auth stuff
gist.on('token', function (token) {
  console.log('new token is', token)
})
//gist.auth('gister-v3')
// /auth stuff

// You can pipe stuff
//.pipe(mystream)

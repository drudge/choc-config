var vows = require('vows')
var assert = require('assert')

var response = require('./mock/response')
var request = require('./mock/request')

var Gist = require('../gister')

function clone_gist(opts) {
  opts = opts || { gist_id: 1, username: 'octocat', token: 'secret' }
  var gist = new Gist(opts)
  gist.request = request
  return gist
}

function wrap(cb) {
  return function () {
    cb.apply(cb, [null].concat(Array.prototype.slice.call(arguments, 0)))
  }
}

function error(msg) {
  return function (err) {
    assert.isTrue(err instanceof Error)
    assert.equal(err.message, msg)
  }
}

function ok(body) {
  return function (topic) {
    assert.deepEqual(body, topic)
  }
}

var sample_gist = {
  'ring.erl': 'contents of gist'
}

vows.describe('gister').addBatch({
  'when getting a gist': {

    'and not providing a gist id': {
      topic: function () {
        var gist = clone_gist()
        gist.gist_id = null
        try {
          gist.get()
        } catch (e) {
          this.callback(null, e)
        }
      },

      'should receive an error': error('No gist id provided')
    },

    'by gist id': {
      topic: function () {
        var gist = clone_gist({ gist_id: 1 })
        gist.on('gist', wrap(this.callback))
        gist.get()
      },

      'should return the body': ok(response.get)
    },

    'and an error is returned from request': {
      topic: function () {
        var gist = new Gist({ gist_id: 1 })
        gist.request = function (statusCode, cb) {
          cb(new Error('Mock error'), { statusCode: 200, headers: {} }, {})
        }
        gist.on('error', wrap(this.callback))
        gist.get()
      },

      'should call error event': error('Mock error')
    },

    'and the response statusCode is not found 404': {
      topic: function () {
        var gist = new Gist({ gist_id: 1 })
        gist.request = function (statusCode, cb) {
          cb(null, { statusCode: 404, headers: {} }, { message: 'Not found' })
        }
        gist.on('error', wrap(this.callback))
        gist.get()
      },

      'should call notfound event': error('Not found')
    },

    'and the response statusCode is 500 internal server error': {
      topic: function () {
        var gist = new Gist({ gist_id: 1 })
        gist.request = function (statusCode, cb) {
          cb(null, { statusCode: 500, headers: {} }, { message: 'Internal Server Error' })
        }
        gist.on('error', wrap(this.callback))
        gist.get()
      },

      'should emit error event': error('Internal Server Error')
    }
  },

  'when synchronizing the gist': {

    'and providing a gist id': {
      topic: function () {
        var gist = clone_gist({ token: 'secret' })
        gist.on('edited', wrap(this.callback))
        gist.sync(sample_gist, 1)
      },

      'should edit existing gist': ok(response.patch)
    },

    'with no gist id': {
      topic: function () {
        var gist = clone_gist()
        gist.gist_id = null
        gist.on('created', wrap(this.callback))
        gist.sync(sample_gist)
      },

      'should create a new gist': function (err, topic, id) {
        assert.deepEqual(topic, response.post)
        assert.equal(id, '1')
      }
    }
  },

  'when editing a gist': {

    'and providing token and gist id': {
      topic: function () {
        var gist = clone_gist({ gist_id: 1, token: 'secret' })
        gist.on('edited', wrap(this.callback))
        gist.edit(sample_gist)
      },

      'should receive a response': ok(response.patch)
    },

    'and not providing a gist id': {
      topic: function () {
        var gist = clone_gist()
        gist.gist_id = null
        try {
          gist.edit()
        } catch (e) {
          this.callback(null, e)
        }
      },

      'should receive an error': error('No gist id provided')
    },

    'and providing a username but no password': {
      topic: function () {
        var gist = clone_gist({ username: 'octocat', gist_id: 1 })
        try {
          gist.edit(sample_gist)
        } catch (e) {
          this.callback(null, e);
        }
      },

      'should receive an error': error('No OAuth token or username and password provided')
    },

    'without providing a username, just a password': {
      topic: function () {
        var gist = clone_gist({ password: 'secret', gist_id: 1 })
        try {
          gist.edit(sample_gist)
        } catch (e) {
          this.callback(null, e);
        }
      },

      'should receive an error': error('No OAuth token or username and password provided')
    }
  },

  'when creating a new gist': {

    'and authenticated': {
      topic: function () {
        var gist = clone_gist()
        gist.on('created', wrap(this.callback))
        gist.create(sample_gist)
      },

      'should receive a response': ok(response.post)
    },

    'without providing a password': {
      topic: function () {
        var gist = clone_gist({ username: 'octocat' })
        try {
          gist.create(sample_gist)
        } catch (e) {
          this.callback(null, e);
        }
      },

      'should receive an error': error('No OAuth token or username and password provided')
    },

    'providing just then token': {
      topic: function () {
        var gist = clone_gist({ token: 'abc123' })
        gist.request = request
        gist.on('created', wrap(this.callback))
        gist.create(sample_gist)
      },

      'should receive a response': ok(response.post)
    }
  }
}).export(module)

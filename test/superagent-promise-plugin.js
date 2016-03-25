#!/usr/bin/env node
require('es6-promise').polyfill();
var app = require('express')();
var request = require('supertest')(app);
var superagentPromisePlugin = require('../index');
var should = require('should');

app
.get('/success', function(req, res) {
  res.status(200).end();
})
.use(function (req, res) {
  res.status(404).end();
});

describe('superagentPromisePlugin', function () {
  function createReq(route) {
    var req = request.get(route);
    req.use(superagentPromisePlugin);
    return req;
  }

  it('should use callbacks', function () {
    var req = createReq('/success');
    should(req.end(function () {})).equal(req);
  });

  it('should succeed', function (done) {
    createReq('/success')
      .then(function (res) {
        should(res.status).equal(200)
        done();
      })
      .catch(done);
  });

  it('should fail', function (done) {
    function success() {
      throw new Error('promise should not be successful');
    }

    function fail(res) {
      should(res.status).equal(404);
    }

    Promise.all([
      createReq('/not/found').then(success, fail),
      createReq('/not/found').catch(fail),
    ])
      .then(function () {
        done();
      })
      .catch(done);
  });

  it('should set Promise', function (done) {
    var Promise = superagentPromisePlugin.Promise = function (fn) {
      fn(function (res) {
        should(res.status).equal(200);
        done();
      });
    };

    Promise.prototype.then = function () {};
    createReq('/success').then();
  });
});

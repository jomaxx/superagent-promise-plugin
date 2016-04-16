#!/usr/bin/env node
require('es6-promise').polyfill();
var app = require('express')();
var superagent = require('superagent');
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

  beforeEach(function () {
    superagentPromisePlugin.Promise = null;
  });

  it('should succeed', function (done) {
    createReq('/success')
      .then(function (res) {
        should(res.status).equal(200);
        done();
      })
      .catch(done);
  });

  it('should fail', function (done) {
    function success() {
      throw new Error('promise should not be successful');
    }

    function fail(err) {
      should(err.status).equal(404);
      should(err.response).be.type('object');
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

  it('should patch superagent', function (done) {
    superagent.Request.prototype.end = function (fn) {
      fn(null, {
        status: 200
      });
    };

    should(superagentPromisePlugin.patch(superagent)).equal(superagent);

    superagent.get('/success')
      .catch(function () {})
      .then(function (res) {
        should(res.status).equal(200);
        done();
      });
  });
});

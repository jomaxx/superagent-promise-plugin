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

  it('should use callbacks', function () {
    var req = request.get('/success');
    req.use(superagentPromisePlugin);
    should(req.end(function () {})).equal(req);
  });

  it('should succeed', function (done) {
    var req = request.get('/success');

    req = superagentPromisePlugin(req);

    req.end()
      .then(function (res) {
        should(res.status).equal(200);
        done();
      })
      .catch(done);
  });

  it('should fail', function (done) {
    var req = request.get('/not/found');

    req.use(superagentPromisePlugin);

    req.end()
      .then(function () {
        done(new Error('promise should not be successful'));
      })
      .catch(function (err) {
        should(err.status).equal(404);
        done();
      });
  });
});

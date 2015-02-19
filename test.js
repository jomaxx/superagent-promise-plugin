#!/usr/bin/env node
var request = require('supertest');
var app = require('express')();
var superagentPromise = require('./index');
var should = require('should');

app
.get('/success', function(req, res) {
  res.status(200).end();
})
.use(function (req, res) {
  res.status(404).end();
});

describe('superagent-promise', function () {

  it('respond with status 200', function(done){
    request(app)
    .get('/success')
    .use(superagentPromise)
    .promise()
    .then(function (res) {
      res.status.should.equal(200);
      done();
    }, done);
  });

  it('respond with status 404', function(done){
    request(app)
    .get('/not/found')
    .use(superagentPromise)
    .promise()
    .then(function () {
      done(new Error('promise should not be successful'));
    }, function (err) {
      err.status.should.equal(404);
      done();
    });
  });
});

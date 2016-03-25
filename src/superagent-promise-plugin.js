var deprecated = require('./deprecate')(
  function () {},
  'superagentPromisePlugin: Use req.then or req[\'catch\'] instead'
);

function endPromise(req) {
  var _Promise = superagentPromisePlugin.Promise || Promise;

  return new _Promise(function (resolve, reject) {
    req.end(function (err, res) {
      err = err || res.error;
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function then() {
  var promise = endPromise(this);
  return promise.then.apply(promise, arguments);
}

function _catch() {
  var promise = endPromise(this);
  return promise.catch.apply(promise, arguments);
}

/**
 * Shims req.end to return a promise when executed with no callback.
 * @param {Object} req
 * @return {Object} req
 */
function superagentPromisePlugin(req) {
  var oldEnd = req.end;

  req.end = function end() {
    if (arguments.length) return oldEnd.apply(this, arguments);
    deprecated();
    return endPromise(this);
  };

  req.then = then;
  req['catch'] = _catch;

  return req;
}

/**
 * Override with a Promise implementation
 */
superagentPromisePlugin.Promise = null;

module.exports = superagentPromisePlugin;

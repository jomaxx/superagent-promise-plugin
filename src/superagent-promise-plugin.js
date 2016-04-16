function endPromise(req) {
  var _Promise = superagentPromisePlugin.Promise || Promise;

  return new _Promise(function (resolve, reject) {
    req.end(function (err, res) {
      err = err || res.error;
      if (err) {
        err.response = res;
        reject(err);
      } else 
        resolve(res);
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
 * Adds req.then and req.catch methods
 * @param {Object} req
 * @return {Object} req
 */
function superagentPromisePlugin(req) {
  req.then = then;
  req['catch'] = _catch;
  return req;
}

/**
 * Patches superagent so that every request has req.then and req.catch methods
 * @param {Object} superagent
 * @return {Object} superagent
 */
superagentPromisePlugin.patch = function patch(superagent) {
  superagent.Request.prototype.then = then;
  superagent.Request.prototype['catch'] = _catch;
  return superagent;
};

/**
 * Override with a Promise implementation
 */
superagentPromisePlugin.Promise = null;

module.exports = superagentPromisePlugin;

var Q = require('q');

module.exports = function (req) {
  req.promise = function () {
    var deferred = Q.defer();

    req.end(function (err, res) {
      err = err || res.error;
      if (err) deferred.reject(err);
      else deferred.resolve(res);
    });

    return deferred.promise;
  }
}

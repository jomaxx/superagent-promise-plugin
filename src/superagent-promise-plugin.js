/**
 * Shims req.end to return a promise when executed with no callback.
 * @param {Object} req
 * @return {Object} req
 */
function superagentPromisePlugin(req) {
  var end = req.end;

  req.end = function () {
    if (arguments.length) return end.apply(req, arguments);

    return new Promise(function (resolve, reject) {
      end.call(req, function (err, res) {
        err = err || res.error;
        if (err) reject(err);
        else resolve(res);
      });
    });
  };

  return req;
}

module.exports = superagentPromisePlugin;
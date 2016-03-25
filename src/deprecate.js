function deprecate(fn, msg) {
  var warned = false;

  return function deprecated() {
    if (!warned) {
      console.trace(msg);
      warned = true;
    }

    return fn.apply(this, arguments);
  };
};

module.exports = deprecate;

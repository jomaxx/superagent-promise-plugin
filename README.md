# superagent-promise
Plugin for [`visionmedia/superagent`](https://github.com/visionmedia/superagent). Shims `req.end` to return a promise when executed with no callback.

## Install
```
npm install superagent superagent-promise-plugin --save
```

## How to use
Requires ES6 Promises. Polyfill or set `superagentPromisePlugin.Promise` with [`es6-promise`](https://github.com/jakearchibald/es6-promise) or equivalent.

### Example 1
```js
require('es6-promise').polyfill();

var request = require('superagent');
var superagentPromisePlugin = require('superagent-promise-plugin');
var req = request.get('/end/point');

req
  .use(superagentPromisePlugin)
  .end() // no callback returns a promise
  .then(function (res) {
    // success
  })
  .catch(function (err) {
    // error
  });
```

### Example 2
```js
var request = require('superagent');
var superagentPromisePlugin = require('superagent-promise-plugin');
var req = request.get('/end/point');

superagentPromisePlugin.Promise = require('es6-promise');

req
  .use(superagentPromisePlugin)
  .end() // no callback returns a promise
  .then(function (res) {
    // success
  })
  .catch(function (err) {
    // error
  });
```

## License
[MIT](LICENSE)

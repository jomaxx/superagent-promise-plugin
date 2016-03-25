# superagent-promise
Plugin for [`visionmedia/superagent`](https://github.com/visionmedia/superagent). Use `req.then` or `req['catch']` to execute your request and handle via promises.

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
  .catch(function (err) {
    // error
  });
```

## License
[MIT](LICENSE)

# superagent-promise
Plugin for [`visionmedia/superagent`](https://github.com/visionmedia/superagent). Use `req.then` or `req['catch']` to execute your request and handle via promises.

## Install
```
npm install superagent superagent-promise-plugin --save
```

## How to use
Requires ES6 Promises. Polyfill or set `superagentPromisePlugin.Promise` with [`es6-promise`](https://github.com/jakearchibald/es6-promise) or equivalent.

```js
var request = require('superagent');
var superagentPromisePlugin = require('superagent-promise-plugin');

superagentPromisePlugin.Promise = require('es6-promise');

request.get('/end/point')
  .use(superagentPromisePlugin)
  .then(function (res) {
    // success
  })
  .catch(function (err) {
    // error
    var res = err.response; // the full response object
  });
```

## Patching superagent
Patch the `superagent` module so that every request has `req.then` and `req['catch']` methods.

```js
require('es6-promise').polyfill();
var superagentPromisePlugin = require('superagent-promise-plugin');
var request = superagentPromisePlugin.patch(require('superagent'));

request.get('/end/point')
  .then(function (res) {
    // success
  })
  .catch(function (err) {
    // error
  });
```

## License
[MIT](LICENSE)

# superagent-promise
Plugin for visionmedia/superagent that adds a ```promise()``` method to the request object to be used instead of the ```end(callback)``` method

## Install
```
npm install superagent-promise-plugin
```

## How to use
```javascript
var request = require('superagent');
var superagentPromise = require('superagent-promise-plugin');

request.get('/url')
.use(superagentPromise)
.promise() // sends request and returns a Q promise
.then(function (res) {
  // success
}, function (err) {
  // error
});
```

## License
[MIT](LICENSE)

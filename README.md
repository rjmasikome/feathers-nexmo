# feathers-nexmo

Nexmo plugin for feathers.js

## Usage

* Install the module
```
npm install --save feathers-nexmo
```
* Include in your service, and pass the relevant key and secret, for example
```js
app.use('/smser', smser({
  key: YOUR_API_KEY,
  secret: YOUR_API_SECRET
}));
```
* Full example
```js
const smser = require('feathers-nexmo');
const hooks = require('./smser.hooks');

module.exports = function () {
  const app = this;

  app.use('/smser', smser({
    key: YOUR_API_KEY,
    secret: YOUR_API_SECRET
  }));

  const service = app.service('smser');

  service.hooks(hooks);
};
```
* Call the newly created service this way
```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"to": "DESTINATION_NUMBER", "from":"PHONE_OR_ALIAS_IN_NEXMO", "text": "ACTUAL_TEXT"}' \
http://localhost:3030/smser

```

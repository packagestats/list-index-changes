### list-index-changes [![npm](http://img.shields.io/npm/v/list-index-changes.svg)](https://npmjs.org/package/list-index-changes) [![npm](http://img.shields.io/npm/dm/list-index-changes.svg)](https://npmjs.org/package/list-index-changes)

> Get all element movement within lists

`npm install list-index-changes`

### Usage

```js
var listIndexChanges = require('list-index-changes');

var yesterday = ['foo', 'bar'];
var today = ['bar', 'foo'];

var results = listIndexChanges(yesterday, today);
```

`results` will be a list of two elements:

```js
{
  element: 'foo',
  was: 0,
  now: 1
},
{
  element: 'bar',
  was: 1,
  now: 0
}
```

* `was` and `now` represent positional indices within the lists
 * You can optionally get ordinal positions instead of array indices by supplying `{ordinal: true}`. Example: `listIndexChanges(yesterday, today, {ordinal: true})`.

### License

MIT
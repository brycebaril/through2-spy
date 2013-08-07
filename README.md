through2-spy
============

[![NPM](https://nodei.co/npm/through2-spy.png)](https://nodei.co/npm/through2-spy/)

This is a super thin wrapper around [through2](http://npm.im/through2) for creating simple stream.PassThrough spies.

Saves you a tiny bit of boilerplate compared to `through2` for writing stream spies.

Note you will **NOT** be able to do anything but spy and abort the stream pipeline. To do any filtering or transformations you should consider `through2` `through2-filter` or `through2-map`.

Pass a function to run as each chunk goes through your stream pipeline. Return an Error to abort the pipeline.

```js

var spy = require("through2-spy")

var count = 0
var countChunks = spy(function (chunk) {
  count++
})

// vs. with through2:
var countChunks = through2(function (chunk, encoding, callback) {
  count++
  this.push(chunk)
  return callback()
})

// Then use your spy:
source.pipe(countChunks).pipe(sink)

// Additionally accepts `wantStrings` argument to conver buffers into strings
var nsaregex = /(open source)|(foss)|(node\.js)/i
var prizm = spy({wantStrings: true}, function (str) {
  var wiretap = str.match(nsaregex)
  if (wiretap) this.emit("OMGTERRIST", wiretap[0], str)
})

prizm.on("OMGTERRIST", sendDrone(/* ... */))

internet.pipe(prizm).pipe(internet)

// Return an Error to abort the pipeline
var Meter = spy.ctor({maxBytes: 1024, bytes: 0}, function (chunk) {
  this.options.bytes += chunk.length
  if (this.options.bytes >= this.options.maxBytes) return new Error("Over 1024 byte limit!")
})

var meter = new Meter()

```

Options
-------

  * wantStrings: Automatically call chunk.toString() for the super lazy.
  * all other through2 options

LICENSE
=======

MIT
module.exports = make
module.exports.ctor = ctor

var through2 = require("through2")

function ctor(options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  return through2.ctor(options, function (chunk, encoding, callback) {
    if (this.options.wantStrings) chunk = chunk.toString()
    var err = fn.call(this, chunk, encoding)
    if (err instanceof Error) return callback(err)
    this.push(chunk)
    return callback(null)
  })
}

function make(options, fn) {
  return ctor(options, fn)()
}
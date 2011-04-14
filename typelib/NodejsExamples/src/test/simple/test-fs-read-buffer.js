var common = require('../common');
var assert = require('assert');
var path = require('path');
var Buffer = require('buffer').Buffer;
var fs = require('fs');
var filepath = path.join(common.fixturesDir, 'x.txt');
var fd = fs.openSync(filepath, 'r');
var expected = 'xyz\n';
var bufferAsync = new Buffer(expected.length);
var bufferSync = new Buffer(expected.length);
var readCalled = 0;

fs.read(fd, bufferAsync, 0, expected.length, 0, function(err, bytesRead) {
  readCalled++;

  assert.equal(bytesRead, expected.length);
  assert.deepEqual(bufferAsync, new Buffer(expected));
});

var r = fs.readSync(fd, bufferSync, 0, expected.length, 0);
assert.deepEqual(bufferSync, new Buffer(expected));
assert.equal(r, expected.length);

process.addListener('exit', function() {
  assert.equal(readCalled, 1);
});
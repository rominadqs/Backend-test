"use strict"

var app = require('../app'),
    http = require('http'),
    httpServer;

httpServer = http.createServer(app).listen(4200);

httpServer.on('error', function(e) {
    console.log('Error http server');
    console.log(e);
})

console.log('Server running at http://localhost:4200/');

module.exports = {server:httpServer};
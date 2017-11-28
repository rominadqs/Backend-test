var express = require('express'),
    bodyParser = require('body-parser'),
    clients = require('./routes/clients'),
    policies = require('./routes/policies');

var app = express();

app.use(bodyParser.json());

app.use('/',clients);
app.use('/',policies);

module.exports = app;
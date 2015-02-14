'use strict'

var express = require('express');
var app = express();

var badges = require('./controllers/badges');


// parses incoming POST's with a payload and a application/json header as JSON
app.use(express.json());

app.post('/', badges.save, badges.send, function(req, res) {
	res.send('\ndone\n\n');
});



app.listen(8000);
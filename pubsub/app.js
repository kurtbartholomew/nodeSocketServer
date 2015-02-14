'use strict'

var express = require('express');
var app = express();


// parses incoming POST's with a payload and a application/json header as JSON
app.use(express.json());

app.post('/', function(req,res) {
	res.send('hello world');
});

app.listen(8000);
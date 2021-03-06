'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var subSocket = require('./lib/subscribe');
var badges = require('./models/badges'); 

app.use(function(request, response, next) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	next();
});


server.listen(3000, function() {
	console.log('Server is running on port %d', 3000);
});

/**
 * Serve static assets out of public
 */
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('./public/index.html');
});

io.sockets.on('connection', function(socket) {
	badges.get(function(err, data) {
		if (err) return;
		data.forEach(function(badge) {
			socket.emit('badge', badge);
		});
	});
});

subSocket.on('message', function(channel, message) {
	io.sockets.emit('badge', JSON.parse(message));
});
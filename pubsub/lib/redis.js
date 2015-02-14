'use strict';

var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
	// log out to log file or report to analytics
	throw err;
});

module.exports = client;
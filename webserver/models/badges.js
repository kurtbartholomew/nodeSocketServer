'use strict';

var request = require('request');


/**
 * Get badges from pub/sub server
 * @param  {Function}
 */
exports.get = function(callback) {
	request('http://localhost:8000/badges', function(err, response, data) {
		data = JSON.parse(data);
		if(data.error) return callback(err, []);
		callback(null, data.data);
	});
};
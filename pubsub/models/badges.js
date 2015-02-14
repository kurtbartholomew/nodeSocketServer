'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/**
 * Save badges to database
 * @param  {Array} badges
 * @param  {Function} callback
 * @return {[type]}
 */
exports.save = function(badges, callback) {
	if (!badges.length) return callback(null, null);
	// asynchronous recursion
	var badge = badges.pop();
	redis.lpush('badges', JSON.stringify(badge), function(err) {
		if (err) { return callback(err, null) };
		exports.save(badges, callback);
	});

};


/**
 * Trim down the redis list
 * @return {[type]}
 */
exports.trim = function() {
	redis.ltrim('badges', 0, 9);
};


/**
 * [send description]
 * @param  {Array}
 * @param  {Function}
 * @return {[type]}
 */
exports.send = function(badges, callback) {
	badges.forEach(function(badge) {
		broadcast.send(badge);
	});
	badges.forEach(broadcast.send);
	callback(null, null);
};


/**
 * Get 10 badges from model
 * @param  {Function}
 * @return {[type]}
 */
exports.get = function(callback) {
	redis.lrange('badges', 0, -1, function(err, data) {
		if (err) return callback(err, null);
		callback(null, data.map(JSON.parse));
	});
};
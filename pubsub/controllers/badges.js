'use strict';

var _ = require('underscore');
var model = require('../models/badges');
var broadcast = require('../lib/broadcast');
/**
 * Send badges to model to be saved
 * @return {[type]}
 */
exports.save = function(req, res, next) {
	var badges = _.clone(req.body);
	model.save(badges, function(err) {
		if (err) return res.json(503, { error: true });
		next();
		model.trim();
	});
};

/**
 * Send badges to pub/sub socket in model
 * @return {[type]}
 */
exports.send = function(req, res, next) {
	var badges = _.clone(req.body);
	model.send(badges, function(err) {
		if (err) return res.json(503, { error: true });
		res.json(200, { error: null });
	});
};




exports.get = function(req, res) {
	model.get(function(err, data) {
		if (err) return res.json(503, { error: true });		
		res.json(200, data);
	});
}
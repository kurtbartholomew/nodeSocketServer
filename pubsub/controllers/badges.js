'use strict';

var _ = require('underscore');
var model = require('../models/badges');

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
		res.json(200, { error: null });
	});
};
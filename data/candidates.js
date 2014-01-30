var mongoose = require('mongoose'),
	candidate = require('./candidate'),
	db = require('./db');

var register = function (data, callback) {
	var record = new candidate(data);
	record.save(function(err) {
		callback(err);
	});
};

var candidates = {
	register : register
};

module.exports = candidates;
var mongoose = require('mongoose'),
	db = require('./db'),
	member = require('./member');

exports.addTeamMember = function (data, callback) {
	var record = new member(data);
	record.save(function(err) {
		callback(err);
	});
};

exports.getMembers = function (callback, limit) {
	member.find()
	.setOptions({sort: 'name'})
	.exec(function (err, result) {
		callback(err, result);
	});
};

exports.updateTeamMember = function (data, callback) {
	member.update({ _id : data._id }, data.data, function (err, count, raw) {
		callback(err);
	});
};
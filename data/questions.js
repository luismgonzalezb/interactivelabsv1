var mongoose = require('mongoose'),
	db = require('./db'),
	question = require('./question');

exports.addQuestion = function (data, callback) {
	var record = new question(data);
	record.save(function(err) {
		callback(err);
	});
};

exports.getQuestions = function (callback, limit) {
	question.find()
	.exec(function (err, result) {
		callback(err, result);
	});
};

exports.getQuestion = function (id, callback) {
	question.findOne({ _id: id }, function (err, result) {
		callback(err, result);
	});
};

exports.getRandomQuestion = function(_sessionId,callback) {
	question.count(function(err, count) {
		if (err) { callback(err); }
		var rand = Math.floor(Math.random() * count);
		question.findOne({'userResponses.sessionId': {$ne : _sessionId}}).skip(rand).exec(function (err, result) {
			callback(err, result);
		});
	});
};

exports.addUserResponse = function (data,callback) {
	var record = new userResponse(data);
	record.save(function (err) {
		callback(err);
	});
};

exports.updateQuestion = function (data, callback) {
	question.update({ _id : data._id }, data.data, function (err, count, raw) {
		callback(err);
	});
};
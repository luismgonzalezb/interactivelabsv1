var mongoose = require('mongoose'),
	question = require('./question'),
	db = require('./db');

var addQuestion = function (data, callback) {
	var record = new question(data);
	record.save(function(err) {
		callback(err);
	});
};

var getQuestion = function (id, callback) {
	question.findOne({ _id: id }, function (err, result) {
		callback(err, result);
	});
};

var getQuestions = function (limit, callback) {
	question.find()
	.exec(function (err, result) {
		callback(err, result);
	});
};

var getRandomQuestion = function (_sessionId, callback) {
	question.count(function(err, count) {
		if (err) { callback(err); }
		var rand = Math.floor(Math.random() * count);
		question.findOne({'userResponses.sessionId': {$ne : _sessionId}}).skip(rand).exec(function (err, result) {
			callback(err, result);
		});
	});
};

var addUserResponse = function (data, callback) {
	question.update(
		{_id: data._id },
		{ $push: {
	     	'userResponses' : {
				sessionId : data.sessionId,
				response_id : data.response_id
			}
		}},
		{upsert:true},
		function(err, data) { 
			callback(err);
		}
	);
};

var updateQuestion = function (data, callback) {
	question.update({ _id : data._id }, data.data, function (err, count, raw) {
		callback(err);
	});
};

var questions = {
	addQuestion : addQuestion,
	getQuestion : getQuestion,
	getQuestions : getQuestions,
	getRandomQuestion : getRandomQuestion,
	addUserResponse : addUserResponse,
	updateQuestion : updateQuestion
};

module.exports = questions;
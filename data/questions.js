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
	question.findOne({'userResponses.sessionId': {$ne : _sessionId}}).exec(function (err, result) {
		callback(err, result);
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

var checkUserResponses = function (_sessionId, callback) {
	var passed = true;
	question.aggregate([
		{ $unwind: "$userResponses" },
		{ $match : { "userResponses.sessionId" :  _sessionId} },
		{ $sort : { question : 1 } },
		{ $project : { _id : 0, response_id: "$userResponses.response_id" } }
	], function (err, userResponses) {
		if (err) { callback(err, null); }
		question.find({}, { _id : 0, response_id : 1 }, { sort: { question : 1 } }, function (err, questionResponses) {
			for (var i = userResponses.length - 1; i >= 0; i--) {
				if (userResponses[i].response_id !== questionResponses[i].response_id) {
					passed = false;
					break;
				}
			}
			callback(err, passed);
		});		
	});
}

var questions = {
	addQuestion : addQuestion,
	getQuestion : getQuestion,
	getQuestions : getQuestions,
	getRandomQuestion : getRandomQuestion,
	addUserResponse : addUserResponse,
	updateQuestion : updateQuestion,
	checkUserResponses : checkUserResponses
};

module.exports = questions;
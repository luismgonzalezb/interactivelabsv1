var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var response = new schema({
	response_id: Number,
	answer: String
});

var userResponse = new schema({
	sessionId: String,
	response_id: Number
});

var question = new schema({
	question: String,
	timeLimit: Number,
	response_id: Number,
	responses: [response],
	userResponses: [userResponse]
});

module.exports = mongoose.model('Question', question);
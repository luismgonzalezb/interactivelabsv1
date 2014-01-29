var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var response = new schema({
	response_id: String,
	answer: String
});

var userResponse = new schema({
	sessionId: String,
	response_id: String
});

var question = new schema({
	question: String,
	timeLimit: Number,
	response_id: String,
	responses: [response],
	userResponses: [userResponse]
});

module.exports = mongoose.model('Question', question);
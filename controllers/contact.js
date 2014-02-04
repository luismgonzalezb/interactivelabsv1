var questions = require('../data/questions'),
	candidates = require('../data/candidates'),
	jsonResponseHandler = require('../lib/jsonResponseHandler');

var contact = {};

function question(req, res) {
	if (req.cookies.sessionId) {
		questions.getRandomQuestion(req.cookies.sessionId, function(err, question) {
			if (err) { jsonResponseHandler.Json_Response(err, req, res); }
			if (question) {
				res.render('question', { question: question });
			} else {
				questions.checkUserResponses(req.cookies.sessionId, function(err, result) {
					if (err) { jsonResponseHandler.Json_Response(err, req, res); }
					if (result === true) {
						res.render('register');
					} else {
						res.render('thankyou', { success: false });
					}
				});
			}
		});
	} else {
		jsonResponseHandler.BadResponse({ message: "User not defined" }, req, res);
	}
}

function addUserResponse(req, res) {
	if (req.cookies.sessionId && req.body._id) {
		questions.addUserResponse({
			_id: req.body._id,
			sessionId: req.cookies.sessionId,
			response_id: req.body.response
		}, function (err) {
			if (err) { Json_Response(err, req, res); }
			question(req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ message: "User not defined" }, req, res);
	}
}

function register(req, res) {
	if (req.cookies.sessionId && req.body.email) {
		candidates.register(req.body, function (err) {
			if (err) { Json_Response(err, req, res); }
			res.cookie('sessionId', '', { expires: new Date(1), path: '/' });
			res.render('thankyou', { success: true });
		});
	} else {
		jsonResponseHandler.BadResponse({message: "User note defined or Missing Form Data"}, req, res);
	}
}

contact = {
	question: question,
	addUserResponse : addUserResponse,
	register : register
};

module.exports = contact;
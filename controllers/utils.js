var members = require('../data/members'),
	jsonResponseHandler = require('../lib/jsonResponseHandler');

var utils = {};

function team(req, res){
	members.getMembers(function(err, members) {
		if (err) { jsonResponseHandler.BadResponse(err, req, res); }
		res.render('team', { title: 'Team', members: members });
	});
};

// **************************************************************************
// MEMBERS ******************************************************************
// **************************************************************************

function postMember(req, res) {
	if (req.body.name !== null && req.body.name !== undefined) {
		members.addTeamMember(req.body, function (err) {
			jsonResponseHandler.Json_Response(err, req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ mesasge: "Missing Data" }, req, res);
	}
};

function putMember(req, res) {
	if (req.body._id !== null && req.body._id !== undefined) {
		members.updateTeamMember(req.body, function (err) {
			jsonResponseHandler.Json_Response(err, req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ mesasge: "Missing Data" }, req, res);
	}
};

// **************************************************************************
// QUESTIONS ****************************************************************
// **************************************************************************

function postQuestion(req, res) {
	if (req.body.question !== null && req.body.question !== undefined) {
		questions.addQuestion(req.body, function (err) {
			jsonResponseHandler.Json_Response(err, req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ mesasge: "Missing Data"}, req, res);
	}
};

function putQuestion(req, res) {
	if (req.body._id !== null && req.body._id !== undefined) {
		questions.updateQuestion(req.body, function (err) {
			jsonResponseHandler.Json_Response(err, req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ userError: true, mesasge: "Missing Data"}, req, res);
	}
};

utils = {
	team: team,
	postMember: postMember,
	putMember: postMember,
	postQuestion: postQuestion,
	putQuestion: putQuestion
}

module.exports = utils;
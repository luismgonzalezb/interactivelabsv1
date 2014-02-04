var members = require('../data/members'),
	questions = require('../data/questions'),
	projects = require('../data/projects'),
	jsonResponseHandler = require('../lib/jsonResponseHandler');

var utils = {};

// **************************************************************************
// Projects ****************************************************************
// **************************************************************************

function work(req, res) {
	projects.getProjects(function (err, _projects) {
		if (err) { jsonResponseHandler.BadResponse(err, req, res); }
		res.render('work', { title: 'Work', projects : _projects });
	})
}

function postProject(req, res) {
	if (req.body.name) {
		projects.addProject(req.body, function (err) {
			jsonResponseHandler.Json_Response(err, req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ mesasge: "Missing Data"}, req, res);
	}
}

function putProject(req, res) {
	if (req.body._id !== null && req.body._id !== undefined) {
		projects.updateQuestion(req.body, function (err) {
			jsonResponseHandler.Json_Response(err, req, res);
		});
	} else {
		jsonResponseHandler.BadResponse({ userError: true, mesasge: "Missing Data"}, req, res);
	}
}

// **************************************************************************
// MEMBERS ******************************************************************
// **************************************************************************

function team(req, res){
	members.getMembers(function(err, members) {
		if (err) { jsonResponseHandler.BadResponse(err, req, res); }
		res.render('team', { title: 'Team', members: members });
	});
};

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
	work : work,
	team : team,
	postProject : postProject,
	putProject : putProject,
	postMember : postMember,
	putMember : postMember,
	postQuestion : postQuestion,
	putQuestion : putQuestion
}

module.exports = utils;
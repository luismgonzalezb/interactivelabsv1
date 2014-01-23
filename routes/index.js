
var patterns = require('../backgroundFiles'),
	files = patterns('./content/images/patterns'),
	members = require('../data/members'),
	questions = require('../data/questions'),
	uuid = require('node-uuid');

// **************************************************************************
// PAGES ********************************************************************
// **************************************************************************

exports.index = function(req, res){
  res.render('index', { title: 'Home', files: files });
};

exports.team = function(req, res){
	members.getMembers(function(err, members) {
		if (err) { ErrorHandler(err, req, res); }
		res.render('team', { title: 'Team', members: members });
	});
};

exports.us = function(req, res){
	res.render('us', { title: 'Team' });
};

exports.work = function(req, res){
	res.render('work', { title: 'Team' });
};

exports.contact = function(req, res){
	if (!req.cookies.sessionId) {
		var uniqueId = uuid.v4();
		res.cookie('sessionId', uniqueId, { maxAge: 900000 } );
	}
	res.render('contact', { title: 'Reach out To Us' });
};

exports.question = function (req, res) {
	if (req.cookies.sessionId) {
		questions.getRandomQuestion(req.cookies.sessionId, function(err, question) {
			if (err) { ErrorHandler(err, req, res); }
			res.render('question', { question: question });
		});
	} else {
		ErrorHandler({ message: "User not defined" }, req, res);
	}
};

exports.checkResponse = function (req, res) {
	if (req.cookies.sessionId && req.body._id) {
		console.log(req.body);
		/*
		questions.addUserResponse({
			id: req.body._id,
			sessionId: req.cookies.sessionId,
			response_id: req.body.
		});
		questions.getQuestion(req.body._id, function (err, question) {
			console.log(question);
			res.status(200).json({ success: true });
		});
		*/
	} else {
		ErrorHandler({ message: "User not defined" }, req, res);
	}
};

// **************************************************************************
// MEMBERS ******************************************************************
// **************************************************************************

exports.postMember = function(req, res) {
	if (req.body.name !== null && req.body.name !== undefined) {
		members.addTeamMember(req.body, function (err) {
			Json_Respose(err, req, res);
		});
	} else {
		ErrorHandler({ mesasge: "Missing Data" }, req, res);
	}
};

exports.putMember = function (req, res) {
	if (req.body._id !== null && req.body._id !== undefined) {
		members.updateTeamMember(req.body, function (err) {
			Json_Respose(err, req, res);
		});
	} else {
		ErrorHandler({ mesasge: "Missing Data" }, req, res);
	}
};

// **************************************************************************
// QUESTIONS ****************************************************************
// **************************************************************************

exports.postQuestion = function (req, res) {
	if (req.body.question !== null && req.body.question !== undefined) {
		questions.addQuestion(req.body, function (err) {
			Json_Respose(err, req, res);
		});
	} else {
		ErrorHandler({ mesasge: "Missing Data"}, req, res);
	}
};

exports.putQuestion = function (req, res) {
	if (req.body._id !== null && req.body._id !== undefined) {
		questions.updateQuestion(req.body, function (err) {
			Json_Respose(err, req, res);
		});
	} else {
		ErrorHandler({ userError: true, mesasge: "Missing Data"}, req, res);
	}
};

// **************************************************************************
// EXTRA FUNCTIONS **********************************************************
// **************************************************************************

function Json_Respose (err, req, res) {
	if (err) { ErrorHandler(err, req, res); }
	res.status(200).json({ success: true });
}

function ErrorHandler(err, req, res) {
	console.log(err);
	var mesasge = err.message || "System Error";
	res.status(500).json({ success: false, mesasge: mesasge });
}
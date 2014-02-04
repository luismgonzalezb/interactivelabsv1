var mongoose = require('mongoose'),
	db = require('./db'),
	project = require('./project');

exports.addProject = function (data, callback) {
	var record = new project(data);
	record.save(function(err) {
		callback(err);
	});
};

exports.getProjects = function (callback, limit) {
	project.find()
	.setOptions({sort: 'name'})
	.exec(function (err, result) {
		callback(err, result);
	});
};

exports.updateProject = function (data, callback) {
	project.update({ _id : data._id }, data.data, function (err, count, raw) {
		callback(err);
	});
};
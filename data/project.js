var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var project  = new schema({
	name: String,
	customer: String,
	link: String,
	logo: String,
	logoBW : String,
	phtotoset: [String],
	services: [String]
});

module.exports = mongoose.model('Project', project);
var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var candidate = new schema({
	email: String,
	name: String,
	why: String
});

module.exports = mongoose.model('Candidate', candidate);
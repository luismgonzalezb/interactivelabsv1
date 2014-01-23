var mongoose = require('mongoose');

module.exports = mongoose.model('Member', {
	name: String,
	mTitle: String,
	copy: String,
	image: String
});
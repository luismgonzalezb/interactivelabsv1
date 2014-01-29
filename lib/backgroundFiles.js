var fs = require( 'fs' );

module.exports = function (_path) {
	var files = fs.readdirSync(_path);
	return files;
};
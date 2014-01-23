var compressor = require('node-minify');
module.exports = function(_files) {
	if (typeof(_files) == 'object') {
		if (_files.css !== null && _files.css !== undefined) {
			// Using YUI Compressor for CSS
			new compressor.minify({
				type: 'yui-css',
				fileIn: _files.css.inputs,
				fileOut: _files.css.output,
				callback: function(err, min){
					if (err) {
						console.log(err);
					}
				}
			});
		}
		if (_files.js !== null && _files.js !== undefined) {
			// Using YUI Compressor for JS
			new compressor.minify({
				type: 'yui-js',
				fileIn: _files.js.inputs,
				fileOut: _files.js.output,
				callback: function(err, min){
					if (err) {
						console.log(err);
					}
				}
			});
		}
	}
};
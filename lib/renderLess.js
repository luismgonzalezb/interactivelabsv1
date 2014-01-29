var less = require( 'less' );
var fs = require( 'fs' );
var path = require('path');
var minifier = require('./minifier');

module.exports = function (_options) {
	if (typeof(_options) == 'object') {

		var mainPath = _options.paths[0] + _options.filename;
		// Load the file, convert to string
		fs.readFile( mainPath, function ( error, data ) {
			var dataString = data.toString();
			var options = _options;

			// Create a file name such that
			//  if options.filename == gaf.js and options.compress = true
			//    outputfile = gaf.min.css
			options.outputfile = options.filename.split(".less")[0] + (options.compress ? ".min" : "") + ".css";
			// Resolves the relative output.dir to an absolute one and ensure the directory exist
			options.outputDir = path.resolve( process.cwd(), options.outputDir) + "/";
			ensureDirectory( options.outputDir );

			// Create a parser with options, filename is passed even though its loaded
			// to allow less to give us better errors
			var parser = new less.Parser(options);
			parser.parse( dataString, function ( error, cssTree ) {
				if ( error ) {
					less.writeError( error, options );
					return;
				}

				// Create the CSS from the cssTree
				var cssString = cssTree.toCSS( {
					compress   : options.compress,
					yuicompress: options.yuicompress
				});

				// Write output
				fs.writeFile( options.outputDir + options.outputfile, cssString, 'utf8', function (err) {
					if (err) throw err;
					minifier({
						css : {
							inputs: [
								__dirname + "/../content/css/bootstrap.min.css",
								__dirname + "/../content/css/ilicons.css",
								__dirname + "/../content/css/main.css",
							],
							output: __dirname + "/../content/css/styles.min.css"
						},
						js : {
							inputs: [
								__dirname + "/../content/scripts/jquery.noty.packaged.min.js",
								__dirname + "/../content/scripts/jquery.validate.min.js",
								__dirname + "/../content/scripts/bootstrap.min.js",
								__dirname + "/../content/scripts/il.library.js",
								__dirname + "/../content/scripts/_layout.js",
							],
							output: __dirname + "/../content/scripts/scripts.min.js"
						}
					});
					minifier({
						js : {
							inputs: [ __dirname + "/../content/scripts/contact.js" ],
							output: __dirname + "/../content/scripts/contact.min.js"
						}
					});
				});
			});

		});
	} else {
		console.log("There was no options and we can't process the file without options");
	}

	var ensureDirectory = function (filepath) {
		var dir = path.dirname(filepath);
		var existsSync = fs.existsSync || path.existsSync;
		if (!existsSync(dir)) { fs.mkdirSync(dir); }
	};

};
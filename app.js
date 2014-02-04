/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	dust = require('dustjs-linkedin'),
	cons = require('consolidate'),
	less = require('./lib/renderLess');

less({
	paths         : ['./content/less/'],// .less file search paths, the first on the array is used for the main less
	outputDir     : './content/css/',	// output directory, note the '/'
	optimization  : 1,					// optimization level, higher is better but more volatile - 1 is a good value
	filename      : 'main.less',		// root .less file
	compress      : false,				// compress?
	yuicompress   : false				// use YUI compressor?
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');
app.engine('dust', cons.dust);
app.use(express.cookieParser('tlespolcuatlo'));
app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use('/content', express.static(path.join(__dirname, 'content')));
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Something broke!');
});
//app.use(express.logger('dev')); Turn on to See all Traffic

app.get('/', routes.index);
app.get('/team', routes.team);
app.get('/us', routes.us);
app.get('/work', routes.work);
app.get('/contact', routes.contact);
app.get('/contact/question', routes.question);
app.post('/contact', routes.addUserResponse);
app.post('/register', routes.register);
app.post('/project', routes.postProject);
app.put('/project', routes.putProject);
app.post('/members', routes.postMember);
app.put('/members', routes.putMember);
app.post('/questions', routes.postQuestion);
app.put('/questions', routes.putQuestion);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
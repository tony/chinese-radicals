var fs = require('fs')
  , _ = require('lodash')
  , express = require('express')
  , cons = require('consolidate');

var app = express();

var serverHost = process.env.host || '0.0.0.0';
var serverPort = process.env.port || 3000;
var media_path = require('path').join(__dirname, '..', '/media');
var media_bower_path = require('path').join(__dirname, '..', '/app/bower_components');
var media_app_path = require('path').join(__dirname, '..', '/app');


app.engine('mustache', cons.hogan);

app.set('view engine', 'mustache');
app.set('views', require('path').join(__dirname, '/tpl'));

app.use('/media', express.static(media_path));
app.use('/media/bower_components', express.static(media_bower_path));
app.use('/media/app', express.static(media_app_path));

app.get('/json', function (req, res) {
  res.json({
    testjson: 'hello world'
  });
});

app.get('*', function (req, res, next) {
  res.locals.js = [
    '/media/js/app.js',
    'http://127.0.0.1:32822/livereload.js'
  ];
  res.locals.js = [{
    src: '/media/bower_components/requirejs/require.js',
    'data-main': '/media/app/app'
  }, {
    src: 'http://127.0.0.1:32882/livereload.js'
  }];
  res.locals.css = [
    '/media/css/app.css' 
  ];
  next();
});

app.get('/', function (req, res, next) {
  _.extend(res.locals, {
    title: 'study chinese radicals'
  });
  res.render('page', {});
});

console.log('Server now running on <http://%s:%s>.', serverHost, serverPort);
app.listen(serverPort, serverHost);

exports = module.exports = app;

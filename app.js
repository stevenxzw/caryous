
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var hbs = require('hbs');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
app.get('/', routes.index);
app.get('/users', user.list);

app.get('/s', function(req, res) {
    res.send('Hello World');
});

app.get('/api',api.api);


app.get('/list', function(req, res) {
    console.log(req);
    res.send('Hello World list');
});



app.get('/', function(req, res) {
    res.sendfile('./views/index.html', {name : 'mydata'}, function(){
        console.log('----------------');
    });
});

app.get('/', routes.index);
app.get('/list', user.list);
 */
app.use(express.static('public'));
app.use(express.bodyParser());
// 加载数据模块
var blogEngine = require('./data/blog');
app.get('/', function(req, res) {
    res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

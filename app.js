
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

//var connectDb = require('./mongoTest.js');





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
//connectDb.connectDb();
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

var Server = require('mongodb').Server,
    mongo = require('mongodb');

var dbhost = 'ds033709.mongolab.com';
var dbport = 33709;
var dbserver = new Server(dbhost,dbport, {auto_reconnect:true});
var dbconnector = new mongo.Db('stevenxie',dbserver,{safe:true});
var mdb;


app.use(express.static('public'));
app.use(express.bodyParser());
// 加载数据模块
var blogEngine = require('./data/blog');
app.get('/', function(req, res) {
    var _db =  mdb.collection('test1');
    _db.find({},function(err,cursor){

        var ids = [];

        console.log('=====');
        cursor.toArray(function(err, docs) {
            console.log(docs.length);
            var results = [];
            // Check that we have all the results we want
            docs.forEach(function(doc) {
               ids.push(doc.id);
            });
            res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries(), doc:ids.join('---')});
        });


    });
    //console.log(_db);

   // var _mdb = mdb.collection('users');

    //insertDb(mdb.collection('users'));

   // res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});


dbconnector.open(function(err,db){
    if(err) throw err;
    db.authenticate('admin', '123456', function(err, success) {//remenber to edit your username and password.
        mdb = db;
        //app.listen(3000, "127.0.0.1");
        app.listen(app.get('port'), function(){
            console.log('Express server listening on port ' + app.get('port'));
        });
        console.log("Server started on port 3000");
        console.log(err);
        console.log(success);
    });
});

//app.listen(app.get('port'), function(){
//    console.log('Express server listening on port ' + app.get('port'));
//});


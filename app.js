
/**
 * Module dependencies.
 */
 
var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environmentss
app.set('port', process.env.PORT ||80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride()); 
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', function(req, res){ 
  res.writeHead(200,{'content-type':'text/html'});
  res.write('<!doctype html><html><head><meta charset="utf-8"><title>CGH-BACKEND</title><style>'+
  	        'body{background:#2f2f2f;background:-moz-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);'+
  	        'background:-webkit-gradient(radial,center center,0px,center center,100%,color-stop(0%,#2f2f2f),color-stop(100%,#1b1b1b));'+
  	        'background:-webkit-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);background:-o-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);'+
  	        'background:-ms-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);background:radial-gradient(ellipse at center,#2f2f2f 0%,#1b1b1b 100%);'+
  	        'filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#2f2f2f",endColorstr="#1b1b1b",GradientType=1);background-repeat:no-repeat;'+
  	        'background-size:cover;background-attachment:fixed}</style></head><body><center><div style="height:150px;"></div>'+
  	        '<div style="height:200px;"></div></div></center></body></html>');
  res.end();
});
var server =http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
}); 


var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) { 
    socket.on('btnPanic', function(data,data2){
      data = {x:data,y:data2};
      socket.broadcast.emit('btnPanic',data);
    });
});

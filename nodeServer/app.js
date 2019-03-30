var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./db');
var port = 8080;


app.get('/', function(req, res){
  db.User.find({}, function(err, users) {
    res.send(users);  
  });
});

http.listen(port, function(){
  console.log('listening on', port );
});

io.on('connection', function(socket){
    console.log('a user connected');
  });
  
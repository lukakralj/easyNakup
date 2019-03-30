

const server_address = 'http://localhost:8080';
var socket = require('socket.io-client')(server_address);


socket.on('connect', function(){
    console.log("connected to",server_address)
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
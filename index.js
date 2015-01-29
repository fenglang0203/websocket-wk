/**
 * nodejs socket mock workstation demo
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});

io.on('connection', function(socket){

	socket.on('ws:heartbeat', function(data){
		console.log("heat....");
	});

    socket.on('redis:command', function(data){
        console.log('redis');
        console.log(data);
    });

  	socket.on('disconnect', function(){
  		console.log("断开连接");
  	});

    socket.on('message', function (obj) {
        console.log(obj);
    });
    socket.on('close', function (obj) {
        console.log(obj);

    });
});

http.listen(8899, function(){
    console.log('listening on *:8899');
});
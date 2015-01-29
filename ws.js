/**
 * Created by dutao.dt on 2014/9/16.
 */
var WebSocket = require('faye-websocket'),
    fs        = require('fs'),
    path      = require('path'),
    http      = require('http');

var server = http.createServer();

server.on('upgrade', function(request, socket, body) {

    if (WebSocket.isWebSocket(request)) {
        var ws = new WebSocket(request, socket, body);

        ws.on('message', function(event) {
            //区分event，集中处理请求
            var data = JSON.parse(event.data);
            if(data.event == 'ws:heartbeat'){
                fs.readFile('./dataApi/heart.json', {encoding: 'utf-8'}, function (err, data) {
                    if (err) throw err;
                    ws.send(data);
                });
            }
            else if(data.event == 'resource:bind'){
                ws.send(JSON.stringify({"resourceId":"biz21776346","resourceType":"app"}));
            }
            else if(data.event == 'redis:command'){
                fs.readFile('./dataApi/redisBack.json', {encoding: 'utf-8'}, function (err, data) {
                    if (err) throw err;
                    console.log(data);
                    ws.send(data);
                });
            }
            else{
                ws.send(JSON.stringify({}));
            }
        });

        ws.on('close', function(event) {
            console.log('close', event.code, event.reason);
            ws = null;
        });
    }
});
console.log('web socket start 8899');
server.listen(8899);
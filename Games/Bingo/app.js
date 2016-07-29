(function(){

    'use strict'

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

    app.use(express.static(__dirname + '/node_modules'));
    app.use(express.static(__dirname + '/app'));

    server.listen(3000);

    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

    io.sockets.on('connection', function(socket){
        
        socket.on('sendUserId', function(data){
            //Emits to every one
            io.sockets.emit('newUser', data);
            //Emits to every one except sender
            //socket.broadcast.emit('new message', data);
        })
    });

})()
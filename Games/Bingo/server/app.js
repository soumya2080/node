(function(){

    'use strict'

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server),
        mongoose = require('mongoose'),
        port=3000;
    
    require('./socket')(io);

    app.use(express.static(__dirname + '/../node_modules'));
    app.use(express.static(__dirname + '/../app'));

    app.get('/', function(req, res){
        res.sendFile(__dirname + '../app/index.html');
    });

    app.get('*', function (req, res) {
        res.redirect('/');
    });

    server.listen(port);
    server.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    });
    
})()
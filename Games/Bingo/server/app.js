(function() {

    'use strict'

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server),
        mongoose = require('mongoose'),
        path = require('path'),
        //index = require('./routes/index'),
        //api = require('./routes/api'),
        //authenticate = require('./routes/authenticate')(passport),
        port = 3000;

    require('./socket')(io);

    app.use(express.static(path.join(__dirname + '/..', '/bower_components')));
    app.use(express.static(path.join(__dirname + '/..', '/app')));

    //app.use('/api', api);
    //app.use('/auth', authenticate);

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/..', '/app/index.html'));
    });

    server.listen(port);
    server.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    });

})()
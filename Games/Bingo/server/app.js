(function() {

    'use strict'

    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server),
        mongoose = require('mongoose'),
        path = require('path'),
        expressValidator = require('express-validator'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        routes = require('./routes/index'),
        api = require('./routes/api'),
        //authenticate = require('./routes/authenticate')(passport),
        port = 3000,
        socket = require('./socket')(io);

    app.use(express.static(path.join(__dirname + '/..', '/bower_components')));
    app.use(express.static(path.join(__dirname + '/..', '/app')));

    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    // Express Session
    app.use(session({
        secret: 'bingoSecrete',
        saveUninitialized: true,
        resave: true
    }));

    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());

    // Express Validator
    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param : formParam,
                msg   : msg,
                value : value
            };
        }
    }));

    app.use('/', routes);
    //app.use('/api', api);
    //app.use('/auth', authenticate);

    server.listen(port);
    server.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    });

})()
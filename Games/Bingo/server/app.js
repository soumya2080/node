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
        auth = require('./routes/auth'),
        port = 3000;
        require('./socket')(io);

    var dbUrl = 'mongodb://localhost/bingo';
    var dbConfig = {};
    mongoose.connect(dbUrl, dbConfig);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to MongoDB');
    });

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
    /*app.get('/login', function(req, res, next) {
        res.sendFile(path.join(__dirname + '/..', '/index.html'));
    });*/
    app.use('/auth', auth);
    app.use('/api', api);
    app.get('/*', function(req, res, next) {
        res.sendFile(path.join(__dirname + '/..', '/index.html'));
    })
    server.listen(port);
    server.on('listening', function() {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    });

})()
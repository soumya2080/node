(function() {

    'use strict'

    var express = require('express');
    var app = express();
    var server = require('http').createServer(app);
    var io = require('socket.io').listen(server);
    var mongoose = require('mongoose');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var passport = require('passport');
    var config = require('./config/config');
    
    require('./socket')(io);

    mongoose.connect(config.dbUrl, config.dbConfig);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    app.use(express.static(path.join(__dirname + '/..', '/bower_components')));
    app.use(express.static(path.join(__dirname + '/..', '/app')));

    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());


    require('./config/passport')(passport);
    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());

    require('./routes/routes')(app, passport, path, express);
    
    server.listen(process.env.PORT || config.port);
    server.on('listening', () => {
        console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    });

})()
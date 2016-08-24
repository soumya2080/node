var path = require('path');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

router.post('/register', function(req, res, next) {
	var userName = req.body.userId,
        email = req.body.email,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword;

        var user = new User({
            user_name: userName,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName
        });

        User.create(user, function(err, user){
            if (err) {
                return res.status(500).json({err: errmsg});
            }
            return res.status(200).json({status: 'Registration successful!'});
        })
});

passport.use(new LocalStrategy(
    function(userName, password, done) {
        User.findByUsername(userName, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({err: info});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({err: 'Could not log in user'});
            }
            res.status(200).json({status: 'Login successful!'});
        });
  })(req, res, next);
});

router.get('/logout', function(req, res) {

});

module.exports = router;
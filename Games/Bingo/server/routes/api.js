var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.post('/signup', function(req, res, next) {
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
            if(err) throw err;
            console.log(user);
        })
});

router.post('/login', function(req, res, next){

});

router.get('/logout', function(req, res) {

});

module.exports = router;
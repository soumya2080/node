var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/*', authenticated, function(req, res, next) {
	console.log('authenticated');
	res.sendFile(path.join(__dirname + '/../..', '/index.html'));
});

function authenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
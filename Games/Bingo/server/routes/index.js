var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', authenticated, function(req, res, next) {
	console.log('hi');
	//res.sendFile(path.join(__dirname + '/..', '/app/index.html'));
});

function authenticated(req, res, next){
	console.log('hi');
	if(req.isAuthenticated() || req.url === '/login' || req.url === '/signup'){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
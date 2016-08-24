var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema({
	user_name: {type: String, required: true, unique: true},
	password: {type: String, required: true}, //hash created from password
    email: {type: String, unique: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	created_at: {type: Date, default: Date.now}
})

var User = module.exports = mongoose.model('User', userSchema);

module.exports.create = function(user, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt , function(err, hash){
			user.password = hash;
			user.save(callback);
		});
	});
}

module.exports.findByUsername = function(userName, callback){
	var query = {user_name: userName};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback){
	bcrypt.compare(password, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

module.exports.findById = function(id, callback){	
	User.findById(id, callback);
}
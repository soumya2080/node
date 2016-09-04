var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var Token = require('./token')(mongoose);
var userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: {type: String},
    email: {type: String, unique: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	facebook: {
		id: String,
		token: String
	},
	google: {
		id: String,
		token: String
	},
	token: {
		type: Schema.Types.ObjectId,
		ref: 'Token',
		default: null
	}
});

/*userSchema.pre('save', (next) => {
	var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});*/

userSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = () => {
    var token = new Token();
	token.value = "";
	token.user = this._id;
	this.token = token._id;
	this.save((err)=>{
		if(err) throw err;
		token.save((err) => {
			if(err) throw err;
		});
	});
};

/*userSchema.methods.findById = (id, callback) => {	
	User.findOne({_id : id}, callback);
}

userSchema.methods.findByUsername = (userName, callback) => {
	var query = {username: userName};
	User.findOne(query, callback);
}*/

module.exports = mongoose.model('User', userSchema);

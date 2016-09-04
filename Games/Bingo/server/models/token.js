var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var tokenSchema = new mongoose.Schema({
	value: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expireAt: {
        type: Date,
        expires: 60,
        default: Date.now
    }
});

module.exports = mongoose.model('Token', tokenSchema);
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('./user.js');
var passwordRecoverySchema = mongoose.Schema({
	user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	email: String,
	resetPasswordToken: String,
	resetPasswordExpires: String
});

module.exports = mongoose.model('PasswordRecovery', passwordRecoverySchema);
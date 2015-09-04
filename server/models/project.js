var mongoose = require('mongoose');
var User = require('./user.js');
var projectSchema = mongoose.Schema({
	name: String,
	creator: {type: mongoose.Schema.ObjectId, ref:'User'},
	members: [{
		isAdmin: String,
		isAccepted: String,
		description: String,
		{type:mongoose.Schema.ObjectId, ref: 'User'}
	}],
	startDate: Date,
	endDate: Date,
	scrumMaster: String,
	productOwner: String
});

module.exports = mongoose.model('Project', projectSchema);
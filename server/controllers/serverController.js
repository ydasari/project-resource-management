var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');
var nodemailer = require('nodemailer');
var smtpTransport = require('../../config/emailConfig');
var crypto = require("crypto");

var PasswordRecovery = require('../models/passwordRecovery');

module.exports.forgotPassword = function(req, res){
	var token;
	crypto.randomBytes(20,function(err, buff){
		token = buff.toString('hex');
	});

	User.findOne({'local.email': req.body.email}, function(err, user){
		if(err){
			return err;
		}
		if(!user){
			res.send({message: 'no Email Found'});
		}
		if(user){
			console.log("the user is: ", user);
			var passwordRecovery = new PasswordRecovery();
			passwordRecovery.user_id = user._id;
			passwordRecovery.email = req.body.email;
			passwordRecovery.resetPasswordToken = token;
			passwordRecovery.resetPasswordExpires = Date.now() + 3600000;
			passwordRecovery.save(function(err){
				if(err){
					return err;
				}
				else{
					smtpTransport.sendMail({
						from: "dasariyeshwant@gmail.com",
						to: req.body.email,
						subject: "PRM Password Reset",
						text: "you are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n"+
								"please click on the following link, or paste this into your browser to complete the process:\n\n" +
								"http://localhost:8000/#/resetPasswordToken/"+token+"\n\n"+
								"if you did not request this, please ignore this mail and your password will remain unchanged.\n"
					}, function(error, response){
						if(error){
							return error;
						}
						else{
							res.send({message: 'emailFound'});
						}
					});
				}
			});
		}
	});
}
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');
//var nodemailer = require('nodemailer');
var sendgrid = require('sendgrid')('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');
//var smtpTransport = require('../../config/emailConfig');
var crypto = require("crypto");
var PasswordRecovery = require('../models/passwordRecovery');
	
module.exports.forgotPassword = function(req, res){
	var token;
	crypto.randomBytes(20,function(err, buff){
		token = buff.toString('hex');
	});
	console.log("the local email is: ", req.body.email);
	User.findOne({'local.email': req.body.email}, function(err, user){
		if(err){
			return err;
		}
		if(!user){
			console.log("no email found");
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
					console.log("the cursor is here and receivers email address is: ",req.body.email);
					var payload = {
						to 		: req.body.email,
						from	: "dasariyeshwant@gmail.com",
						subject	: "UHG Project Resource Management reset Token",
						text	: "you are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n"+
								"please click on the following link, or paste this into your browser to complete the process:\n\n" +
								"http://localhost:3000/#/resetPasswordToken/"+token+"\n\n"+
								"if you did not request this, please ignore this mail and your password will remain unchanged.\n"
					}
					sendgrid.send(payload, function(err, json){
						if (err){
							console.log(err);
						}
						else{
							console.log(json);
							res.send({message: 'emailFound'});
						}
					});
				}
			});
		}
	});
}

module.exports.resetPasswordToken = function(req, res){
	PasswordRecovery.findOne({'resetPasswordToken': req.params.token, 'resetPasswordExpires': {$gt:Date.now()}}, function(err, passwordRecovery){
		if(err){
			console.log(err);
		}
		if(!passwordRecovery){
			res.send({message: 'invalidToken'});
		}
		if(passwordRecovery){
			res.send({message:'validToken', passwordToken:passwordRecovery.resetPasswordToken});
		}
	});
}

module.exports.updatePassword = function(req, res){
	PasswordRecovery.findOne({'resetPasswordToken': req.body.token, 'resetPasswordExpires': {$gt:Date.now()}}, function(err, response){
		if(err){
			console.log(err);
		}
		if(!response){
			res.send({message: 'invalidToken'});
		}
		if(response){
			console.log("the response is: ", response);
			User.findOne({'_id': response.user_id}, function(error, data){
				if(error){
					console.log(error);
				}
				if(!data){
					console.log("no data exists");
				}
				if(data){
					console.log("the new passwoird is: ", req.body.password);
					data.local.password = data.generateHash(req.body.password);
					data.save();
					response.resetPasswordToken = undefined;
					response.resetPasswordExpires = undefined;
					response.save();
					res.send(data);
				}
			});
		}
	});
}

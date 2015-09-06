var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "",
		pass: ""
	}
});
module.exports = smtpTransport;

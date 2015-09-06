var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "dasariyeshwant@gmail.com",
		pass: "enigmaYEIS100"
	}
});
module.exports = smtpTransport;
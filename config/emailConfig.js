var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "",
		pass: ""
	}
});
module.exports = smtpTransport;
var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    url               = require('url'),
    mongoose          = require('mongoose'),
    passport		  = require('passport'),
    flash 			  = require('connect-flash'),
    cookieParser 	  = require('cookie-parser'),
    session      	  = require('express-session');

//requiring mongodb config file for connecting to mongodb  
require('./config/mongoDbConfig');

// pass passport for configuration
require('./config/passport')(passport); 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//using static files 
app.use(express.static(__dirname + '/client/js'));
app.use(express.static(__dirname + '/client/css'));
app.use(express.static(__dirname + '/client/images'));
app.use(express.static(__dirname + '/client/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// required for passport
 app.use(cookieParser()); // read cookies (needed for auth)

app.use(session({
    secret: 'projectresourcemanagement',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//requiring api routes for routing through application
var router = require('./server/routeCalls');
app.use('/', router);



require('./server/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(3000, function() {
  console.log('I m Listening...');
})
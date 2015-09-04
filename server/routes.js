module.exports = function(app, passport){
	var passport = require('passport');
	var LocalStrategy    = require('passport-local').Strategy;
	app.get('/', function(req, res){
		res.render('index.html');
	});


	 // process the signup form
        app.post('/signup', function(req, res, next){
        	passport.authenticate('local-signup', function(err, user, info){
        		if(err){
                    console.log("this email is already taken");
        			res.redirect('/#/signup');
        		}
                if (!user) {
                    res.send({
                        failuremessage: 'emailused'
                    });
                }
               	if(user){
                    
                    //console.log("email taken in routes");
        			res.send({
        				message: 'successful signup',
                        user: user
        			});
        		}
        	})(req, res, next);
        });

        // process the login form
		app.post('/login', function(req, res, next){
 			passport.authenticate('local-login', function(err, user, info){
 				if(err){

 					return next(err);
 				}
 				if(!user){
                    return res.send(401,{ success : false, message : 'authentication failed' });
 					res.send({
 						message:'no user'
 					});
 				}
 				req.login(user, function(err){
 					if(err){
 						return next(err);
 					}
 					res.send({
 						message: 'successful login',
 						user: user
 						// firstName: user.local.fName,
 						// lastName: user.local.lName
 					});
 				});	
 			})(req, res, next);
 		});


	// app.post('/login', 
	// 	passport.authenticate('local'),
	// 	function(req, res){

	// 	});
};

var auth = function (req, res, next){
            if (!req.isAuthenticated()) {
                res.send(401);
            }
            else
                next();
        };
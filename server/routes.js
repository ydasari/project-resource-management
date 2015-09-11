module.exports = function(app, passport) {


app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/forgotPassword', function(req, res){
    res.render('forgotPassword.html');
});

// app.get('/resetPasswordToken', function(req, res){
//     ///validae token
//     res.render('resetPassword.html');
// });


// route to test if the user is logged in or not
 app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
 });  
 
  // route for logging out
            app.get('/logout', function(req, res) {
                req.logout();
                res.send({message:'logged out'});
            });
  
        // process the signup form
        app.post('/signup', function(req, res, next){
            passport.authenticate('local-signup', function(err, user, info){
                if(err){
                    console.log("this email is already taken");
                    res.redirect('/#/signup');
                }

                if (!user) {
                    if(user===false){
                         res.send({message: 'emailused', user:user});      
                    }
                    else{
                          res.send({message: 'emailused', user:user});
                    }
                  
                }
                if(user){
                    res.send({message: 'successful signup', user: user});
                }
            })(req, res, next);
        });



          // route for logging out
            app.get('/logout', function(req, res) {
                req.logout();
                res.send({message:'logged out'});
            });


       

        // process the login form
        app.post('/login', function(req, res, next){
            passport.authenticate('local-login', function(err, user, info){
                if(err){

                    return next(err);
                }
                if(!user){
                    console.log("the user is: ",user);
                    return res.status(401).send({success : false, message : 'authentication failed'});
                    //return res.send(401,{ success : false, message : 'authentication failed' });
                }
                req.login(user, function(err){
                    console.log("test1");
                    if(err){
                        return next(err);
                        console.log("test2");
                    }
                    console.log("test3");
                    res.send({
                        message: 'successful login',
                        user: user
                        // firstName: user.local.fName,
                        // lastName: user.local.lName
                    });
                }); 
            })(req, res, next);
        });


    
};
 var auth = function (req, res, next){
            if (!req.isAuthenticated()) {
                res.send(401);
            }
            else
                next();
        };
// // route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/');
// }
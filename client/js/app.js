
/**
*defining angular module
**/
var app = angular.module('PRM', ['ui.router', 'ngStorage', 'authModule']);

/**
*defining app configurations
**/
app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('/',{
			url: '/',
			templateUrl: 'main.html',
			controller: 'landingPageCtrl'
		})
		.state('/signUp',{
			url: '/signUp',
			templateUrl: 'signUp.html',
			controller: 'authCtrl'
		})
		.state('/login',{
			url: '/login',
			templateUrl: 'login.html',
			controller: 'authCtrl'
		})
		.state('/userHome',{
			url:'/userHome',
			templateUrl: 'userHome.html',
			controller: 'userHomeCtrl'
		})
		.state('/forgotPassword',{
			url: '/forgotPassword',
			templateUrl: 'forgotPassword.html',
			controller: 'forgotPasswordCtrl'
		})
		.state('/resetPasswordToken/:token',{
			url:'/resetPasswordToken/:token',
			templateUrl: 'resetPassword.html',
			controller: 'resetPasswordCtrl'
		});		
		$urlRouterProvider.otherwise('/');
});



/**
*controller for authorization
**/
app.controller('authCtrl',['$scope', 'authService', '$location', '$localStorage', '$timeout', function($scope, authService, $location, $localStorage, $timeout){
	
	$scope.signupSuccess = $localStorage.signupMessage;
	$scope.passwordUpdated = $localStorage.updatedPassword;
	$timeout(function() {
		delete $localStorage.signupMessage;
		delete $localStorage.updatedPassword;
	}, 3000);

	$scope.createUser = function(){
		authService.addUser($scope.fName, $scope.lName, $scope.email, $scope.password).then(function(data){
			console.log("the data is: ",data);
			$scope.existingPassword = $scope.email;
			if(data.user === false){
				console.log("first: ",data);
				$scope.email = "";
				$scope.emailTaken = true;
			}
			else{
				console.log("second: ",data);
				$localStorage.signupMessage = true;
				$location.path('/login');
			}
		});
		
	};

	$scope.loginUser = function(){
		
		authService.checkUser($scope.loginEmail, $scope.loginPassword)
			.then(function(data){
				console.log("the login data is: ",data);
				if(data.message === 'successful login'){
					$localStorage.profile = {};
					$localStorage.profile.user_id = data.user._id;
					$localStorage.profile.fname = data.user.profile.fName;
					$location.path('/userHome');
				}
		}).catch(function(response){
			console.log("the response is: ",response);
			if(response.message === "authentication failed"){
				$scope.invalidCredentials = true;
			}
		});
	};
	
}]);


app.controller('forgotPasswordCtrl', ['$scope', '$q', 'authService', '$localStorage', '$timeout', function($scope, $q, authService, $localStorage, $timeout){

	$scope.tokenFailed = $localStorage.tokenStatus;

	$scope.forgotPassword = function(){
		delete $localStorage.tokenStatus;

		authService.forgotPasswordLink($scope.forgotPasswordEmail).then(function(data){
			console.log(data);
			if(data.message === 'emailFound'){
				$scope.emailSent = true;
				$scope.emailNotSent = false;
			}
			else{
				$scope.emailNotSent = true;
				$scope.emailSent = false;
			}
		});
	};
}]);

/**
*controller for landing page
**/
app.controller('landingPageCtrl', ['$scope', function($scope){
	$scope.world = "hello";
}]);



/**
*controller for navbar
**/
app.controller('navBarCtrl', ['$rootScope', '$scope', '$localStorage', '$http', '$location', function($rootScope, $scope, $localStorage, $http, $location){
	
	
	
	if($localStorage.profile == null){
		$rootScope.loggedInUserNav = false;
		$rootScope.mainNav = true; 
	}
	else{
		$rootScope.mainNav = false; 
		$rootScope.loggedInUserNav = true;
		$rootScope.userName = $localStorage.profile.fname;
	}

	$scope.logOut = function(){
		$http.get('/logout').success(function(response){
			if(response.message === 'logged out'){
				$rootScope.loggedInUserNav = false;
				$rootScope.mainNav = true; 
	            delete $localStorage.profile;                 //deleting the localstorage on successful logout
	            delete $localStorage.signupMessage;
	            console.log("successfully logged out");
	            $location.path('/');
         	}
		});
	};

}]);


app.controller('resetPasswordCtrl', ['$scope', '$location', '$q', 'authService', '$localStorage', function($scope, $location, $q, authService, $localStorage){
	
	authService.getResetPasswordToken().then(function(data){
		console.log("this is data: ",data);
		if(data.message === "validToken"){
			$scope.displayResetForm = true;
			$scope.tokenNumber = data.passwordToken;
		}
		if(data.message === 'invalidToken'){
			$localStorage.tokenStatus = "invalid";
			$location.path('/forgotPassword');
		}
	});

	$scope.updatePassword = function(req, res){
		$scope.newPass = $scope.password;
		console.log("the new pass is: ",$scope.newPass);
		authService.updatePassword($scope.password, $scope.tokenNumber).then(function(data){
			console.log("new data: ",data);
			$localStorage.updatedPassword = true;
			$location.path('/login');
		});
	};

}]);


/**
*controller for userHome
**/
app.controller('userHomeCtrl', ['$scope', '$location', '$localStorage', '$http', '$q', '$rootScope', function($scope, $location, $localStorage, $http, $q, $rootScope){
	$rootScope.mainNav = false; 
	$rootScope.loggedInUserNav = true;
}]);

/**
*Service for authorization
**/
var authModule = angular.module('authModule', [])
	.service('authService', function($http, $localStorage, $q, $location){
	
	var deferred = $q.defer();
	

	//function for creating new user
	this.addUser = function(fname, lname, email, password){
		
		$http.post('/signup',{
			email: email,
			password: password,
			fName: fname,
			lName: lname
		}).success(function(response){
			deferred.resolve(response);					
		}).error(function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.checkUser = function(email, password){
		$http.post('/login',{
			email: email,
			password: password
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.forgotPasswordLink = function(email){
		var deferred = $q.defer();
		$http.post('/forgotPassword',{
			email: email 
		}).success(function(response){
			console.log("the new response is: ",response);
			deferred.resolve(response);
		}).error(function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.getResetPasswordToken = function(){
		var tokenPath = $location.path();
		console.log("this is tokenPath: ", tokenPath);
		$http.get(tokenPath)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(error){
				deferred.reject(error);
			});
			return deferred.promise;
	};

	this.updatePassword = function(newPassword, token){
		console.log("the new values are: "+newPassword+" and "+token);
		$http.post('/updatePassword',{
			password : newPassword,
			token : token
		})
		.success(function(response){
			deferred.resolve(response);
		})
		.error(function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	}


});
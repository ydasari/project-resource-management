
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
		});		
		$urlRouterProvider.otherwise('/');
});



/**
*controller for authorization
**/
app.controller('authCtrl',['$scope', 'authService', '$location', '$localStorage', '$timeout', function($scope, authService, $location, $localStorage, $timeout){
	
	$scope.signupSuccess = $localStorage.signupMessage;
	$timeout(function() {
		delete $localStorage.signupMessage;
	}, 5000);

	$scope.createUser = function(){
		authService.addUser($scope.fName, $scope.lName, $scope.email, $scope.password).then(function(data){
			console.log("the data is: ",data);
			if(data.failuremessage === 'emailused'){
				$scope.emailTaken = true;
			}
			if(data.message === 'successful signup'){
				$localStorage.signupMessage = true;
				$location.path('/login');
			}
		});
		
	};

	$scope.loginUser = function(){
		authService.checkUser($scope.loginEmail, $scope.loginPassword).then(function(data){
			console.log("the login data is: ",data);
			if(data.message === 'successful login'){
				$localStorage.profile = {};
				$localStorage.profile.user_id = data.user._id;
				$localStorage.profile.fname = data.user.profile.fName;
				$location.path('/userHome');

			}
		});
	};
	
}]);


app.controller('forgotPasswordCtrl', ['$scope', 'authService', function($scope, authService){

	$scope.forgotPassword = function(){
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




/**
*controller for userHome
**/
app.controller('userHomeCtrl', ['$scope', '$location', '$localStorage', '$http', '$q', function($scope, $location, $localStorage, $http, $q){
	$rootScope.mainNav = false; 
	$rootScope.loggedInUserNav = true;
}]);

/**
*Service for authorization
**/
var authModule = angular.module('authModule', [])
	.service('authService', function($http, $localStorage, $q){
	
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
		$http.post('/forgotPassword',{
			email: email 
		}).success(function(response){
			deferred.resolve(response);
		}).error(function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	};

});
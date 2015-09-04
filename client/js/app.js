
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
		});		
		$urlRouterProvider.otherwise('/');
});



/**
*controller for authorization
**/
app.controller('authCtrl',['$scope', 'authService', function($scope, authService){
	$scope.createUser = function(){
		$scope.firstName = $scope.fName;
		$scope.lastName = $scope.lName;
		console.log("the fullName is: "+$scope.firstName+" "+$scope.email);

		authService.addUser($scope.firstName, $scope.lastName, $scope.email, $scope.password);
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
app.controller('navBarCtrl', ['$scope', function($scope){
	$scope.name = "hello";
}]);



/**
*Service for authorization
**/
var authModule = angular.module('authModule', [])
	.service('authService', function($http, $localStorage){
	
	console.log("test1");

	//function for creating new user
	this.addUser = function(fname, lname, email, password){
		$http.post('/signup',{
			email: email,
			password: password,
			fName: fname,
			lName: lname
		}).success(function(data){
			console.log(data);
		}).error(function(response){
			console.log("the response is: ",response);
		});
	};


});

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


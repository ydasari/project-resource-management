
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
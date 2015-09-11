
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
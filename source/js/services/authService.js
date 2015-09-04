
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

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


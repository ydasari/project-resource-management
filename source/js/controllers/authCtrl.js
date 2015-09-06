
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


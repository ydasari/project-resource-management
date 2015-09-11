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
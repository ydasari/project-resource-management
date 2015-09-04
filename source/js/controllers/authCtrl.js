
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


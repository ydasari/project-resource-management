app.controller('forgotPasswordCtrl', ['$scope', '$q', 'authService', '$localStorage', '$timeout', function($scope, $q, authService, $localStorage, $timeout){

	$scope.tokenFailed = $localStorage.tokenStatus;

	$scope.forgotPassword = function(){
		delete $localStorage.tokenStatus;

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
app.controller('forgotPasswordCtrl', ['$scope', 'authService', function($scope, authService){

	$scope.forgotPassword = function(){
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
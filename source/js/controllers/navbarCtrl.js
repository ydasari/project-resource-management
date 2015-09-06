
/**
*controller for navbar
**/
app.controller('navBarCtrl', ['$rootScope', '$scope', '$localStorage', '$http', '$location', function($rootScope, $scope, $localStorage, $http, $location){
	
	
	
	if($localStorage.profile == null){
		$rootScope.loggedInUserNav = false;
		$rootScope.mainNav = true; 
	}
	else{
		$rootScope.mainNav = false; 
		$rootScope.loggedInUserNav = true;
		$rootScope.userName = $localStorage.profile.fname;
	}

	$scope.logOut = function(){
		$http.get('/logout').success(function(response){
			if(response.message === 'logged out'){
				$rootScope.loggedInUserNav = false;
				$rootScope.mainNav = true; 
	            delete $localStorage.profile;                 //deleting the localstorage on successful logout
	            delete $localStorage.signupMessage;
	            console.log("successfully logged out");
	            $location.path('/');
         	}
		});
	};

}]);


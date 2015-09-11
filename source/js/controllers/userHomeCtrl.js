

/**
*controller for userHome
**/
app.controller('userHomeCtrl', ['$scope', '$location', '$localStorage', '$http', '$q', '$rootScope', function($scope, $location, $localStorage, $http, $q, $rootScope){
	$rootScope.mainNav = false; 
	$rootScope.loggedInUserNav = true;
}]);
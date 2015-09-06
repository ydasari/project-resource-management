

/**
*controller for userHome
**/
app.controller('userHomeCtrl', ['$scope', '$location', '$localStorage', '$http', '$q', function($scope, $location, $localStorage, $http, $q){
	$rootScope.mainNav = false; 
	$rootScope.loggedInUserNav = true;
}]);
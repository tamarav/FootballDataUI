angular.module('mainApp', []).controller('Controller2', function($scope, $http){
	
	$scope.selected_url= localStorage.getItem('url');
	$scope.curent_matchday = localStorage.getItem('matchday');
	$scope.full_url = $scope.selected_url + "?matchday=" + $scope.curent_matchday;
});

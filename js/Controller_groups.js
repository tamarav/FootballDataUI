angular.module('mainApp', [])
	.directive('tableNext', function() {
		return {
			templateUrl: 'templates/NextMatchdayTableTemplate.html'
		}
	})
	.directive('tablePrevious', function() {
		return {
			templateUrl: 'templates/PreviousMatchdayTableTemplate.html'
		}
	})
	.controller('Controller2', function($scope, $http){
	
	$scope.selected_url= localStorage.getItem('url');
	$scope.next_matchday = localStorage.getItem('next_matchday');
	$scope.previous_matchday = localStorage.getItem('previous_matchday');
	$scope.caption = localStorage.getItem('caption');
	$scope.full_url_next = $scope.selected_url + "?matchday=" + $scope.next_matchday;
	$scope.full_url_previous = $scope.selected_url + "?matchday=" + $scope.previous_matchday;
	$scope.current_matchday;
	$scope.groups = [];
	$scope.errors = [];
	$scope.selected_group;
	$scope.next_match_couples = function() {
		var url;
		url = $scope.full_url_next;
		$scope.current_matchday = $scope.next_matchday;
		$http({
			headers:
			{ 'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
			url,
			dataType: 'json',
			type: 'GET',
		}).then(function(response) {
			$scope.teams = [];
			$scope.groups = [];
			angular.forEach(response.data.fixtures, function(item){
			$scope.groups.push(item);
			});
		}, function(error){
			$scope.errors.push(error.data.error);
		});
	}
	$scope.previous_match_couples = function() {
		$scope.current_matchday = $scope.previous_matchday;
		var url;
		url = $scope.full_url_previous;
		console.log(url);
		$http({
			headers:
			{ 'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
			url,
			dataType: 'json',
			type: 'GET',
		}).then(function(response) {
			$scope.teams = [];
			$scope.groups = [];
			angular.forEach(response.data.fixtures, function(item){
			$scope.groups.push(item);
			});
		}, function(error){
			$scope.errors.push(error.data.error);
		});
	}
});

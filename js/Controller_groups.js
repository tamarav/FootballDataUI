angular.module('mainApp', []).controller('Controller2', function($scope, $http){
	
	$scope.selected_url= localStorage.getItem('url');
	$scope.curent_matchday = localStorage.getItem('matchday');
	$scope.caption = localStorage.getItem('caption');
	$scope.full_url = $scope.selected_url + "?matchday=" + $scope.curent_matchday;
	$scope.groups = [];
	$scope.errors = [];
	$scope.selected_group;
	$scope.next_match_couples = function() {
		var url;
		url = $scope.full_url;
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
			console.log(response.data.fixtures);
			angular.forEach(response.data.fixtures, function(item){
			$scope.groups.push(item);
			});
		}, function(error){
			$scope.errors.push(error.data.error);
		});
	}
});

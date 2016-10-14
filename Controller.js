angular.module('mainApp', []).controller('Controller', function($scope, $http){
	
	$scope.teams = [];
	$scope.groups = [];
	$scope.leagues =[];
	$scope.errors = [];
	$scope.group_competition = true;

	$scope.leagueTable = function(country) {
		var url;
		url = country._links.leagueTable.href;
		$scope.group_competition = false;
		$http({
			headers:
			{ 'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
			url,
			dataType: 'json',
			type: 'GET',
		}).then(function(response) {
			console.log(response.data);
			var standing_array = [];
			$scope.teams = [];
			$scope.groups = [];
			if(typeof response.data.standing != 'undefined') {
				angular.forEach(response.data.standing, function(item){
					$scope.teams.push(item);
					$scope.group_competition = false;
				});
			} else if(typeof response.data.standings != 'undefined') {
				angular.forEach(response.data.standings, function(item){
					$scope.groups.push(item);
					$scope.group_competition = true;
				});
			}
			$scope.errors = [];
		}, function(error){
			$scope.errors.push(error.data.error);
		});
	}
	$scope.listOfLeagues = function(){
		var url = 'http://api.football-data.org/v1/competitions/';
		$http({
			headers:
				{ 	'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
			url,
			dataType: 'json',
			type: 'GET',
		}).then(function(response){
			angular.forEach(response.data, function(item){
				$scope.leagues.push(item);
			})
			$scope.errors = [];
		}, function(error){
			$scope.errors.push(error.data.error);
		});
		var url = 'http://api.football-data.org/v1/competitions/';
		$http({
			headers:
				{ 	'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
			url,
				dataType: 'json',
			type: 'GET',
			}).then(function(response){
				var array_of_leagues = [];
				angular.forEach(response.data, function(item){
				array_of_leagues.push(item);
			})
			$scope.leagues = array_of_leagues;
			}, function(error){
				$scope.errors.push(error.data.error);
			});
	}
});

angular.module('mainApp', []).controller('Controller', function($scope, $http){
	
	$scope.teams = [];
	$scope.groups = [];
	$scope.leagues =[];
	$scope.errors = [];
	$scope.group_competition = true;
	$scope.selected_league;
	$scope.selected_group;
	
	$scope.leagueTable = function(country) {
		var url;
		var next = parseInt(country.currentMatchday) + 1;
		localStorage.setItem('url', country._links.fixtures.href);
		localStorage.setItem('matchday', next);
		localStorage.setItem('caption', country.caption);
		url = country._links.leagueTable.href;
		$scope.group_competition = false;
		$scope.selected_league =  country;
		$http({
			headers:
			{ 'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
			url,
			dataType: 'json',
			type: 'GET',
		}).then(function(response) {
			$scope.teams = [];
			$scope.groups = [];
			if(typeof response.data.standing != 'undefined') {
				angular.forEach(response.data.standing, function(item){
					$scope.teams.push(item);
				});
				$scope.group_competition = false;
			} else if(typeof response.data.standings != 'undefined') {
				angular.forEach(response.data.standings, function(item){
					$scope.groups.push(item);
				});
				$scope.group_competition = true;
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
	}
});
angular.module('mainApp', []).controller('Controller', function($scope, $http){
$scope.teams = [];
$scope.leagueTable = function(country) {
	var url;
	switch(country)
	{
		case "ENGLAND":	
		url = 'http://api.football-data.org/v1/competitions/426/leagueTable';
		break;
		case "GERMANY":	
		url = 'http://api.football-data.org/v1/competitions/430/leagueTable';
		break;
		case "SPAIN":
		url = 'http://api.football-data.org/v1/competitions/436/leagueTable';
		break;
		case "FRANCE":
		url = 'http://api.football-data.org/v1/competitions/434/leagueTable';
		break;
		case "ITALY":
		url='http://api.football-data.org/v1/competitions/438/leagueTable';
		break;
	}
$http({
	headers: 
	{ 'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
	url,
	dataType: 'json',
	type: 'GET',
	}).then(function(response) {
	var array_of_clubs = [];
	angular.forEach(response.data.standing, function(item){
	array_of_clubs.push(item);
	})
	$scope.teams = array_of_clubs;
	console.log($scope.teams);
	}, function(error){
	console.log(error);
	});
	}
});

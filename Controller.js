angular.module('mainApp', []).controller('Controller', function($scope, $http){
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
		url = 'http://api.football-data.org/v1/competitions/424/leagueTable';
		break;
	}
$http({
	headers: 
	{ 'X-Auth-Token': '53605e25707346f09ff7ddc20273519b' },
	url,
	dataType: 'json',
	type: 'GET',
	}).then(function(response) {
	console.log(response.data.standing[0].teamName);
	}, function(error){
	console.log(error);
	});
	}
});

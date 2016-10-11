angular.module('mainApp', []).controller('Controller', function getTable($scope, $http){
    var url = "http://api.football-data.org/v1/competitions/433/leagueTable";
	$http.get(url).success(function(response) {
		console.log(response);
      //  $scope.answer = response.data;
    });
});

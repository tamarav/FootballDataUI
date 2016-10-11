angular.module('mainApp', []).controller('Controller', function getTable($scope, $http){
    $http.get("http://api.football-data.org/v1/competitions/433/leagueTable")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
});

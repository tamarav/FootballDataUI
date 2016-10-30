angular.module('mainApp', [])
    .service('Leagues', function ($http) {

        var service = this;
        var http = $http;
        var errors = [];

        service.listOfLeagues = function () {
            var leagues = [];
            var url = 'http://api.football-data.org/v1/competitions/';
            http({
                headers: {'X-Auth-Token': '53605e25707346f09ff7ddc20273519b'},
                url,
                dataType: 'json',
                type: 'GET',
            }).then(function (response) {
                angular.forEach(response.data, function (item) {
                    leagues.push(item);
                });
                errors = [];
            }, function (error) {
                errors.push(error.data.error);
            });
            return leagues;
        }

        service.getErrors = function(){
            return errors;
        }
    })
    .directive('leagueButton', function() {
        return {
            scope: true,
            replace: true,
            template: '<button type="button" aria-haspopup="true" aria-expanded="false">{{x.caption}}</button>'
        };
    })
    .directive('tableData', function() {
        return {
            scope: true,
            replace: true,
            template: '<table ng-if="teams.length > 0 && !group_competition">'+
                '<tr><th> POSITION </th>' +
                '<th> TEAM </th>' +
                '<th> PLAYED GAMES </th>' +
                '<th> POINTS </th>' +
                '<th> GOALS </th>' +
                '<th> GOALS AGAINST </th>' +
                '<th> GOAL DIFFERENCE </th>' +
                '<th> WINS </th>' +
                '<th> DRAWS </th>' +
                '<th> LOSSES </th>' +
                '<th> HOME </th>' +
                '<th> GOALS </th>' +
                '<th> GOALS AGAINST </th>' +
                '<th> WINS </th>' +
                '<th> DRAWS </th>' +
                '<th> LOSSES </th>'+
                '<th> AWAY </th>' +
                '<th> GOALS </th>' +
                '<th> GOALS AGAINST </th>' +
                '<th> WINS </th>' +
                '<th> DRAWS </th>' +
                '<th> LOSSES </th>' +
                '</tr>' +
                '<tr  ng-repeat="x in teams">'+
                '<td >{{x.position}}.</td>' +
                '<td>{{x.teamName}}</td>' +
                '<td>{{x.playedGames}}</td>' +
                '<td> {{x.points}}</td>' +
                '<td>{{x.goals}}</td>'+
                '<td >{{x.position}}.</td>' +
                '<td>{{x.teamName}}</td>' +
                '<td>{{x.playedGames}}</td>' +
                '<td> {{x.points}}</td>' +
                '<td>{{x.goals}}</td>'+
                '<td>{{x.goalsAgainst}}</td>' +
                '<td>{{x.goalDifference}}</td>' +
                '<td>{{x.wins}}</td>' +
                '<td>{{x.draws}}</td>' +
                '<td>{{x.losses}}</td>' +
                '<td></td>' +
                '<td>{{x.home.goals}}</td>' +
                '<td>{{x.home.goalsAgainst}}</td>' +
                '<td>{{x.home.wins}}</td>' +
                '<td>{{x.home.draws}}</td>' +
                '<td>{{x.home.losses}}</td>'+
                '<td></td>' +
                '<td>{{x.away.goals}}</td>' +
                '<td>{{x.away.goalsAgainst}}</td>' +
                '<td>{{x.away.wins}}</td>' +
                '<td>{{x.away.draws}}</td>' +
                '<td>{{x.away.losses}}</td>' +
                '</tr></table>'
        };
    })
    .controller('Controller', function ($scope, $http, Leagues) {

        $scope.teams = [];
        $scope.groups = [];
        $scope.leagues = Leagues.listOfLeagues();

        $scope.errors = Leagues.getErrors();

        $scope.group_competition = true;
        $scope.selected_league = null;
        $scope.selected_group = null;

        $scope.leagueTable = function (country) {
            var url;
            var next = parseInt(country.currentMatchday) + 1;
            var previous = parseInt(country.currentMatchday) - 1;
            localStorage.setItem('url', country._links.fixtures.href);
            localStorage.setItem('next_matchday', next);
            localStorage.setItem('previous_matchday', previous);
            localStorage.setItem('caption', country.caption);
            url = country._links.leagueTable.href;
            $scope.group_competition = false;
            $scope.selected_league = country;
            $http({
                headers: {'X-Auth-Token': '53605e25707346f09ff7ddc20273519b'},
                url,
                dataType: 'json',
                type: 'GET',
            }).then(function (response) {
                $scope.teams = [];
                $scope.groups = [];
                if (typeof response.data.standing != 'undefined') {
                    angular.forEach(response.data.standing, function (item) {
                        $scope.teams.push(item);
                    });
                    $scope.group_competition = false;
                } else if (typeof response.data.standings != 'undefined') {
                    angular.forEach(response.data.standings, function (item) {
                        $scope.groups.push(item);
                    });
                    $scope.group_competition = true;
                }
                $scope.errors = [];
            }, function (error) {
                $scope.errors.push(error.data.error);
            });
        }
    });

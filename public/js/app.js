var app = angular.module('myApp', []);

app.controller('MyCtrl', function($scope, $http) {

  $http.get('/elephants').success(function(data) {
    $scope.elephants = data;
  });

});

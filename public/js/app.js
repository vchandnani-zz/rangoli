var app = angular.module('myApp', []);

app.controller('MyCtrl', function($scope, $http) {

  $http.get('/elephants').success(function(data) {
    $scope.elephants = data;
  });

  $scope.destroy = function(elephant_name) {
    if (confirm("Are you sure?")) {
      $http.delete('/elephant/' + elephant_name);
    }
  };

});

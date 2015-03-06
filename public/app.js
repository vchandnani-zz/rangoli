var app = angular.module('myApp', []);

app.controller('MyCtrl', function($scope, $http) {

  $scope.loadData = function () {
    $http.get('/elephants').success(function(data) {
      $scope.elephants = data;
      console.log(JSON.stringify($scope.elephants));
    });
  };

});

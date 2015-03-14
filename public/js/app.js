var app = angular.module('elephantsApp', []).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when("/", {templateUrl: "/views/list.html"}).
      when("/new", {templateUrl: "/views/edit.html", controller: "elephantController"}).
      when("/edit/:id", {templateUrl: "/views/edit.html", controller: "elephantsController"}).
      otherwise({redirectTo: "/"});
  });

function elephantsAppController($scope, $http, $window) {
  $http.get('/elephants').success(function(data) {
    $scope.elephants = data;
  });
  $scope.destroy = function(elephant_id) {
    if (confirm("Are you sure?")) {
      $http.delete('/elephants/' + elephant_id);
      $window.location.href = "/";
    }
  }
}

function elephantController($scope, $http, $window) {
  $scope.title = "New Elephant";
  $scope.elephant = {name: "", rider: "", passengers: ""};
  $scope.save = function() {
    $http.post('/elephants', $scope.elephant);
    $window.location.href = "/";
  }
}

function elephantsController($scope, $routeParams, $http, $location) {
  $scope.title = "Edit Elephant";
  $scope.elephant = $scope.elephants[$routeParams.id];
  $scope.save = function() {
    $http.put('/elephants', $scope.elephant);
    $location.path("/");
  }
}

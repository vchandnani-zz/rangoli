var app = angular.module('app', []).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when("/", {templateUrl: "/views/list.html"}).
      when("/new", {templateUrl: "/views/edit.html", controller: "NewCtrl"}).
      when("/edit/:id", {templateUrl: "/views/edit.html", controller: "EditCtrl"}).
      otherwise({redirectTo: "/"});
  });

function AppCtrl($scope, $location, $http) {
  $http.get('/elephants').success(function(data) {
    $scope.elephants = data;
  });
  $scope.destroy = function(elephant_name) {
    if (confirm("Are you sure?")) {
      $http.delete('/elephant/' + elephant_name);
      $location.path("/");
    }
  };
}

function NewCtrl($scope, $location, $http) {
  $scope.title = "New Elephant";
  $scope.elephant = {name: "", rider: "", passengers: ""};
  $scope.save = function() {
    $http.post('/elephant', $scope.elephant);
    $location.path("/");
  }
}

function EditCtrl($scope, $location, $routeParams, $http) {
  $scope.title = "Edit Elephant";
  $scope.elephant = $scope.elephants[$routeParams.id];
  $scope.save = function() {
    $http.put('/elephant', $scope.elephant);
    $location.path("/");
  }
}

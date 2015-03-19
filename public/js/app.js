var app = angular.module('elephantsApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when("/", {templateUrl: "/views/list.html"}).
    when("/add", {templateUrl: "/views/edit.html", controller: "elephantsAddController"}).
    when("/edit/:id", {templateUrl: "/views/edit.html", controller: "elephantsEditController"}).
    otherwise({redirectTo: "/"});
});

app.factory('elephantFactory', ['$http', function($http) {
  var urlBase = '/elephants';
  var elephantFactory = {};

  elephantFactory.getElephants = function () {
    return $http.get(urlBase);
  };

  elephantFactory.addElephant = function (elephant) {
    return $http.post(urlBase, elephant);
  };

  elephantFactory.updateElephant = function (elephant) {
    return $http.put(urlBase + '/' + elephant.id, elephant)
  };

  elephantFactory.deleteElephant = function (id) {
    return $http.delete(urlBase + '/' + id);
  };

  return elephantFactory;
}]);

function elephantsListController($scope, elephantFactory, $window) {
  $scope.status;
  $scope.elephants;

  getElephants();

  function getElephants() {
    elephantFactory.getElephants()
      .success(function (elephants) {
        $scope.elephants = elephants;
      })
      .error(function (error) {
        $scope.status = 'Unable to load elephants: ' + error.message;
      });
  }

  $scope.deleteElephant = function(elephant_id) {
    if (confirm("Are you sure?")) {
      elephantFactory.deleteElephant(elephant_id)
        .success(function () {
          $window.location.href = "/";
        })
        .error(function (error) {
          $scope.status = 'Unable to delete elephant: ' + error.message;
        });
    }
  }
}

function elephantsAddController($scope, elephantFactory, $window) {
  $scope.title = "Add Elephant";
  $scope.elephant = {name: "", rider: "", passengers: ""};
  $scope.save = function() {
    elephantFactory.addElephant($scope.elephant)
      .success(function () {
        $window.location.href = "/";
      }).
      error(function(error) {
        $scope.status = 'Unable to add elephant: ' + error.message;
      });
  }
}

function elephantsEditController($scope, $routeParams, elephantFactory, $location) {
  $scope.title = "Edit Elephant";
  $scope.elephant = $scope.elephants[$routeParams.id];
  $scope.save = function() {
    elephantFactory.updateElephant($scope.elephant)
      .success(function () {
        $location.path("/");
      })
      .error(function (error) {
        $scope.status = 'Unable to update elephant: ' + error.message;
      });
  }
}

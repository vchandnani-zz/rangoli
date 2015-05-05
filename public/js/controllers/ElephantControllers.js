app.controller('elephantsListController', ['$scope', 'elephantFactory', '$window',
  function ($scope, elephantFactory, $window) {

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

  $scope.deleteElephant = function(elephant) {
    if (confirm("Are you sure?")) {
      elephantFactory.deleteElephant(elephant.id)
        .success(function () {
          var index = $scope.elephants.indexOf(elephant);
          $scope.elephants.splice(index, 1);
        })
        .error(function (error) {
          $scope.status = 'Unable to delete elephant: ' + error.message;
        });
    }
  }

}]);

app.controller('elephantsAddController', ['$scope', 'elephantFactory', '$window',
  function ($scope, elephantFactory, $window) {

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

}]);

app.controller('elephantsEditController', ['$scope', '$routeParams', 'elephantFactory', '$location',
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

}]);

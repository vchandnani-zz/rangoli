app.controller('elephantsListController', ['$scope', 'elephantFactory', '$window',
  function ($scope, elephantFactory, $window) {

  $scope.elephants = {};
  getElephants();

  function getElephants() {
		elephantFactory.getElephants()
      .then(function(elephants) {
				$scope.elephants = elephants.data;
			});
  }

  $scope.deleteElephant = function(elephant) {
    if (confirm("Are you sure?")) {
      elephantFactory.deleteElephant(elephant.id)
				.then(function() {
					var index = $scope.elephants.indexOf(elephant);
					$scope.elephants.splice(index, 1);
				});
    };
  }

}]);

app.controller('elephantsAddController', ['$scope', 'elephantFactory', '$window',
  function ($scope, elephantFactory, $window) {

		$scope.title = "Add Elephant";
		$scope.elephant = {name: "", rider: "", passengers: ""};
		$scope.save = function() {
			elephantFactory.addElephant($scope.elephant)
				.then(function () {
					$window.location.href = "/";
				});
		}

}]);

app.controller('elephantsEditController', ['$scope', '$routeParams', 'elephantFactory', '$location',
  function elephantsEditController($scope, $routeParams, elephantFactory, $location) {

		$scope.title = "Edit Elephant";
		$scope.elephant = $scope.elephants[$routeParams.id];
		$scope.save = function() {
			elephantFactory.updateElephant($scope.elephant)
        .then(function () {
					$location.path("/");
				});
		}

}]);

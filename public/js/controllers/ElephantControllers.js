app.controller('elephantsListController', ['$scope', 'elephantFactory', '$window',
  function ($scope, elephantFactory, $window) {

  $scope.elephants = [];
	var index = 0;

	function indexOfObject(arr, obj) {
		for(var i = 0; i < arr.length; i++){
			if(angular.equals(arr[i], obj)){
				return i;
			}
		};
		return -1;
	}

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
					index = indexOfObject($scope.elephants, elephant);
					$scope.elephants.splice(index, 1);
				});
    };
  }

  getElephants();

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
  function ($scope, $routeParams, elephantFactory, $location) {

		$scope.title = "Edit Elephant";
		$scope.elephant_copy = angular.copy($scope.elephants[$routeParams.id]);
		$scope.elephant = $scope.elephants[$routeParams.id];

		$scope.save = function() {
			elephantFactory.updateElephant($scope.elephant)
        .then(function () {
					$location.path("/");
				});
		}

		$scope.cancel = function() {
      $scope.elephants[$routeParams.id] = $scope.elephant_copy;
			$location.path("/");
		}

}]);

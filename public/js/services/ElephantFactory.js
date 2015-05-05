app.factory('elephantFactory', ['$http', function($http) {

  var urlBase = '/elephants';
  var elephantFactory = {};

  elephantFactory.elephants = {};

  elephantFactory.getElephants = function () {
    return $http.get(urlBase)
      .success(function (data) {
        console.log("elephantFactory getElephants: SUCCESS");
        elephantFactory.elephants = data;
			})
			.error(function () {
				console.log("elephantFactory getElephants: FAILURE");
			});
	};

  elephantFactory.addElephant = function (elephant) {
    return $http.post(urlBase, elephant);
  };

  elephantFactory.updateElephant = function (elephant) {
    return $http.put(urlBase + '/' + elephant.id, elephant)
  };

  elephantFactory.deleteElephant = function (id) {
    return $http.delete(urlBase + '/' + id)
			.success(function (data) {
        console.log("elephantFactory deleteElephant: SUCCESS");
				elephantFactory.elephants.splice(id, 1);
			})
			.error(function () {
        console.log("elephantFactory deleteElephant: FAILURE");
    });
  };

  return elephantFactory;

}]);

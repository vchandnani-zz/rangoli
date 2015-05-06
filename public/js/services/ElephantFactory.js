app.factory('elephantFactory', ['$http', function($http) {

  var urlBase = '/elephants';
  var elephantFactory = {};

  elephantFactory.elephants = [];

  elephantFactory.getElephants = function () {
    return $http.get(urlBase)
      .success(function (data) {
        elephantFactory.elephants = data;
        console.log("elephantFactory getElephants: SUCCESS");
			})
			.error(function () {
				console.log("elephantFactory getElephants: FAILURE");
			});
	};

  elephantFactory.addElephant = function (elephant) {
    return $http.post(urlBase, elephant)
      .success(function () {
        console.log("elephantFactory addElephant: SUCCESS");
      })
      .error(function () {
        console.log("elephantFactory addElephant: FAILURE");
      });
  };

  elephantFactory.updateElephant = function (elephant) {
    return $http.put(urlBase + '/' + elephant.id, elephant)
  };

  elephantFactory.deleteElephant = function (id) {
    return $http.delete(urlBase + '/' + id)
			.success(function (data) {
				elephantFactory.elephants.splice(id, 1);
        console.log("elephantFactory deleteElephant: SUCCESS");
			})
			.error(function () {
        console.log("elephantFactory deleteElephant: FAILURE");
    });
  };

  return elephantFactory;

}]);

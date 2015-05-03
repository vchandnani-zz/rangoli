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

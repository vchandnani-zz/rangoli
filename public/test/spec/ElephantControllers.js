'use strict';

describe('elephantsListController: getElephants', function() {

  var scope, controller, mockFactory, deferred;
  var elephants = { 
		data: [ 
			{ name: 'rangoli', rider: 'vinny', passengers: 'bobby' },
			{ name: 'rangoli2', rider: 'vinny2', passengers: 'bobby2' }
		]
	};

  beforeEach(module('elephantsApp'));

  beforeEach(inject(function($rootScope, $controller, $q, elephantFactory) {
    mockFactory = {
      getElephants: function() {
        deferred = $q.defer();
        return deferred.promise;
      }
    };
    spyOn(mockFactory, 'getElephants').and.callThrough();
    scope = $rootScope.$new();
    controller = $controller('elephantsListController', {
      $scope: scope,
      elephantFactory: mockFactory
    });
  }));

  it('should call getElephants', function() {
    expect(mockFactory.getElephants).toHaveBeenCalled();
  });

  it('should set list of elephants', function() {
    deferred.resolve(elephants);
    scope.$digest();
    expect(scope.elephants).toEqual(elephants.data);
  });

});

describe('elephantsAddController: addElephant', function() {

  var scope, controller, mockFactory, deferred, mockWindow;

  beforeEach(module('elephantsApp'));

  beforeEach(inject(function($rootScope, $controller, $q, elephantFactory, $window) {
    mockFactory = {
      addElephant: function() {
        deferred = $q.defer();
				deferred.resolve({});
        return deferred.promise;
      }
    };
		mockWindow = {
			location: {
				href: "/some/path"
			}
		};
    spyOn(mockFactory, 'addElephant').and.callThrough();
    scope = $rootScope.$new();
    controller = $controller('elephantsAddController', {
      $scope: scope,
      elephantFactory: mockFactory,
			$window: mockWindow
    });
  }));

  it('should call addElephant', function() {
		scope.save();
    expect(mockFactory.addElephant).toHaveBeenCalled();
  });

  it('should set window location href', function() {
    scope.$digest();
		scope.save();
		scope.$apply();
		expect(mockWindow.location.href).toEqual("/");
  });

});

describe('elephantsEditController: updateElephant', function() {

  var scope, routeParams, controller, mockFactory, deferred, location;
  beforeEach(module('elephantsApp'));

  beforeEach(inject(function($rootScope, $routeParams, $controller, $q, elephantFactory, $location) {
    mockFactory = {
      updateElephant: function() {
        deferred = $q.defer();
				deferred.resolve({});
        return deferred.promise;
      }
    };
    spyOn(mockFactory, 'updateElephant').and.callThrough();
		location = $location;
    scope = $rootScope.$new();
    scope.elephants = [];
		scope.elephants[1] = {};
		routeParams = { id: "1" };
    controller = $controller('elephantsEditController', {
      $scope: scope,
			$routeParams: routeParams,
      elephantFactory: mockFactory
    });
  }));

  it('should call updateElephant', function() {
		scope.save();
    expect(mockFactory.updateElephant).toHaveBeenCalled();
  });

  it('should set location path', function() {
    scope.$digest();
		scope.save();
		scope.$apply();
		expect(location.path()).toEqual("/");
  });

});

describe('elephantsListController: deleteElephant', function() {

  var scope, controller, mockFactory, deferred, q;
  var elephants = [
		{ id: 1, name: 'rangoli', rider: 'vinny', passengers: 'bobby' },
		{ id: 2, name: 'rangoli2', rider: 'vinny2', passengers: 'bobby2' }
	];

  beforeEach(module('elephantsApp'));

  beforeEach(inject(function($rootScope, $controller, $q, elephantFactory) {
    mockFactory = {
      getElephants: function () {
        deferred = $q.defer();
        deferred.resolve(elephants);
        return deferred.promise;
        },
      deleteElephant: function (id) {
        deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      }
    };
    spyOn(mockFactory, 'getElephants').and.callThrough();
    spyOn(mockFactory, 'deleteElephant').and.callThrough();
		spyOn(window, 'confirm').and.callFake(function () {
			return true;
		});
		scope = $rootScope.$new();
		controller = $controller('elephantsListController', {
			$scope: scope,
			elephantFactory: mockFactory
		});
  }));

  it('should call deleteElephant', function() {
		var elephant = { id: 1, name: 'rangoli' };
		scope.deleteElephant(elephant);
    expect(mockFactory.deleteElephant).toHaveBeenCalled();
  });

  it('should update scope elephants', function() {
		var elephant = { 
			id: 1, name: 'rangoli', rider: 'vinny', passengers: 'bobby' };
		var expected_data = [ 
			{ id: 2, name: 'rangoli2', rider: 'vinny2', passengers: 'bobby2' } ];
		scope.$digest();
		scope.elephants = [ 
			{ id: 1, name: 'rangoli', rider: 'vinny', passengers: 'bobby' }, 
			{ id: 2, name: 'rangoli2', rider: 'vinny2', passengers: 'bobby2' } ];
		scope.deleteElephant(elephant);
		scope.$apply();
    expect(scope.elephants).toEqual(expected_data);
  });

});

'use strict';

describe('elephantsListController: getElephants', function() {

  var scope, controller, mockFactory, deferred;
  var elephants = { data: [ { name: 'rangoli', rider: 'vinny', passengers: 'bobby' } ] };

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
  var elephants = { data: [ { name: 'rangoli', rider: 'vinny', passengers: 'bobby' } ] };

  beforeEach(module('elephantsApp'));

  beforeEach(inject(function($rootScope, $controller, $q, elephantFactory, $window) {
    mockFactory = {
      addElephant: function() {
        deferred = $q.defer();
        return deferred.promise;
      }
    };
		mockWindow = {
			location: {
				href: "/"
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

  it('should set window location', function() {
		scope.save();
		expect(mockWindow.location.href).toEqual("/");
  });

});

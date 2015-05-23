'use strict';

describe('controller: elephantsListController', function() {

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

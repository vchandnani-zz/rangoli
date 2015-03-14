'use strict';

describe('testing elephants read service', function() {

  var ctrl, scope, httpMock;

  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    httpMock = $httpBackend;
    scope = $rootScope.$new();
    httpMock.when('GET', '/elephants')
      .respond({name: 'rangoli'});
    ctrl = $controller;
    ctrl(elephantsAppController, {
      $scope: scope
    });
	}));

  it('should get the list of elephants and assign it to scope', function() {
    httpMock.expectGET('/elephants');
    httpMock.flush();
    expect(scope.elephants).toEqual({
      name: 'rangoli'
    });
  });

});

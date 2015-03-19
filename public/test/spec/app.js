'use strict';

describe('elephant factory read elephants', function() {

  var httpMock, factory;

  beforeEach(module('elephantsApp'));

  beforeEach(inject(function($httpBackend, elephantFactory) {
    httpMock = $httpBackend;
    factory = elephantFactory;
  }));

  afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
  });

  it('should get the list of elephants', function() {

    var expectedData = { name: 'rangoli', rider: 'vinny', passengers: 'bobby' };
    httpMock.expectGET('/elephants').respond(expectedData);
    factory.getElephants().then( function (response) {
      expect(response.data).toEqual(expectedData)
    });
    httpMock.flush();
  });

});

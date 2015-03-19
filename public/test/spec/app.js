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

  it('should get all elephants', function() {
    var expectedData = { name: 'rangoli', rider: 'vinny', passengers: 'bobby' };
    httpMock.expectGET('/elephants').respond(expectedData);
    factory.getElephants().then( function (response) {
      expect(response.data).toEqual(expectedData)
    });
    httpMock.flush();
  });

  it('should add elephant', function() {
    var expectedData = {};
    var elephantData = { name: 'rangoli', rider: 'vinny', passengers: 'bobby' };
    httpMock.expectPOST('/elephants', elephantData).respond(expectedData);
    factory.addElephant(elephantData).then( function (response) {
      expect(response.data).toEqual(expectedData)
    });
    httpMock.flush();
  });

  it('should update elephant', function() {
    var expectedData = {};
    var elephantData = { id: 3, name: 'rangoli', rider: 'vinny', passengers: 'bobby' };
    httpMock.expectPUT('/elephants/3', elephantData).respond(expectedData);
    factory.updateElephant(elephantData).then( function (response) {
      expect(response.data).toEqual(expectedData)
    });
    httpMock.flush();
  });

  it('should delete elephant', function() {
    var expectedData = {};
    var elephantData = { id: 3, name: 'rangoli', rider: 'vinny', passengers: 'bobby' };
    httpMock.expectDELETE('/elephants/3').respond(expectedData);
    factory.deleteElephant(elephantData.id).then( function (response) {
      expect(response.data).toEqual(expectedData)
    });
    httpMock.flush();
  });

});

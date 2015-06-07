describe('E2E tests: page title and initial list of elephants', function() {

  beforeEach(function() {
    browser.get("http://localhost:4567");
  });

  it('should show page title', function() {
    expect(browser.getTitle()).toEqual("Rangoli's Elephants");
  });

  it('should show initial list of elephants', function() {
		var elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(10);
  });

});

describe('E2E tests: add elephants', function() {

  beforeEach(function() {
    browser.get("http://localhost:4567");
  });

	it('should add elephant to list of elephants', function() {
    element(by.linkText('Add')).click();
		element(by.model('elephant.name')).sendKeys('my favorite name');
		element(by.model('elephant.rider')).sendKeys('my favorite rider');
		element(by.model('elephant.passengers')).sendKeys('my favorite passengers');
    element(by.buttonText("Save")).click();
		browser.driver.sleep(5);
    browser.waitForAngular();
		var elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(11);
	});

});

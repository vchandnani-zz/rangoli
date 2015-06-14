describe('E2E tests: add elephants', function() {

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

	it('should add/delete elephant to/from list of elephants', function() {
		var elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(10);
    element(by.linkText('Add')).click();
		element(by.model('elephant.name')).sendKeys('my favorite name');
		element(by.model('elephant.rider')).sendKeys('my favorite rider');
		element(by.model('elephant.passengers')).sendKeys('my favorite passengers');
    element(by.buttonText("Save")).click();
		browser.driver.sleep(5);
    browser.waitForAngular();
		elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(11);
    var elephant_to_delete = 'my favorite name';
    element.all(by.repeater('elephant in elephants')).filter(function(row) {
      return row.element(by.css('.ng-binding')).getText().then(function(name) {
        return name === elephant_to_delete; 
      });
    })
    .get(0)
    .element(by.css('#delete-button'))
    .click();
    var alertDialog = browser.switchTo().alert();
    alertDialog.accept();
		elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(10);
	});

	it('should update elephant in list of elephants', function() {
    var elephant_to_update = 'rangoli5';
    element.all(by.repeater('elephant in elephants')).filter(function(row) {
      return row.element(by.css('.ng-binding')).getText().then(function(name) {
        return name === elephant_to_update; 
      });
    })
    .get(0)
    .element(by.css('#update-button'))
		.click();
		element(by.model('elephant.rider')).clear().then(function() {
  		element(by.model('elephant.rider')).sendKeys('vinny55');
		});
		element(by.model('elephant.passengers')).clear().then(function() {
  		element(by.model('elephant.passengers')).sendKeys('bobby55');
		});
    element(by.buttonText("Save")).click();
		browser.driver.sleep(5);
    browser.waitForAngular();
		var elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(10);
	});

});

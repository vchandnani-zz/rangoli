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
		element(by.model('elephant.name')).sendKeys('vinny75');
		element(by.model('elephant.rider')).sendKeys('rider75');
		element(by.model('elephant.passengers')).sendKeys('pass75');
    element(by.buttonText("Save")).click();
		browser.driver.sleep(5);
    browser.waitForAngular();
		elephants = element.all(by.repeater('elephant in elephants'));
    expect(elephants.count()).toEqual(11);
		var added_name = "vinny75";
    var elephant_attributes = [];
    element.all(by.repeater('elephant in elephants')).filter(function(row) {
      return row.element(by.css('.ng-binding')).getText().then(function(name) {
        return name === added_name; 
      });
    })
    .get(0)
		.getText()
		.then(function(text) {
			elephant_attributes = text.split(" ");
			expect(elephant_attributes[0]).toEqual('vinny75');
			expect(elephant_attributes[1]).toEqual('rider75');
			expect(elephant_attributes[2]).toEqual('pass75');
		});
    var elephant_to_delete = 'vinny75';
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
    var deleted_name = 'vinny75';
    element.all(by.repeater('elephant in elephants')).filter(function(row) {
      return row.element(by.css('.ng-binding')).getText().then(function(name) {
        return name === deleted_name; 
      });
    })
		.then(function(items) {
		  expect(items.length).toBe(0);
		});
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

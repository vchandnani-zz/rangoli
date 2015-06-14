exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
	  'crud.js',
	],
  capabilities: {
    'browserName': 'firefox'
  }
};

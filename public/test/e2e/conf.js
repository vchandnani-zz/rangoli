exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
		'list.js',
	  'add.js'
	],
  capabilities: {
    'browserName': 'firefox'
  }
};

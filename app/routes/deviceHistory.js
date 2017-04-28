 'use strict';

 module.exports = function(app) {
 	// steps route
 	var dh = require('../../app/controllers/deviceHistory');
 	app.post('/AddDeviceHistory', dh.AddDeviceHistory);



 };
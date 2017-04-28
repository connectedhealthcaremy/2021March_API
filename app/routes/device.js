 'use strict';

 module.exports = function(app) {
 	// User route
 	var device = require('../../app/controllers/device');
 	app.post('/addDevice', device.adddevice);
 	app.get('/getDevice', device.getdevice);
 	app.post('/gcm', device.testdevice);


 };
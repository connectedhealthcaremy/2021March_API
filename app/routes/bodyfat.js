 'use strict';

 module.exports = function(app) {
 	// Body fat route
 	var fat = require('../../app/controllers/bodyfat');
 	app.post('/AddBodyFat', fat.addfat);
 	app.get('/GetBodyFat', fat.getfat);



 };
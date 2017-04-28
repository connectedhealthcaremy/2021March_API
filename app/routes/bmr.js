 'use strict';

 module.exports = function(app) {
 	// BMR route
 	var bmr = require('../../app/controllers/bmr');
 	app.post('/AddBMR', bmr.addbmr);
 	app.get('/GetBMR', bmr.getbmr);



 };
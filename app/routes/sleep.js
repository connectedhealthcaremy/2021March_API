 'use strict';

 module.exports = function(app) {
 	// steps route
 	var sleep = require('../../app/controllers/sleep');
 	app.post('/AddSleep', sleep.addSleep);
 	app.get('/GetSleep', sleep.getSleep);
 	app.get('/GetSleepSteps', sleep.getSleepSteps)


 };